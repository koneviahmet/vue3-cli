const axios = require('axios');

// Get command line arguments
const args = process.argv.slice(2);

// Base URL for the JSON server
const BASE_URL = 'http://localhost:3004';

// Configuration
const config = {
  timeout: 10000, // 10 seconds timeout
  maxRetries: 3,
  retryDelay: 1000 // 1 second between retries
};

// Retry function for axios requests
async function axiosWithRetry(fn, retries = config.maxRetries) {
  try {
    return await fn();
  } catch (error) {
    if (error.code === 'ECONNABORTED' || error.message.includes('closed') || error.code === 'ECONNRESET') {
      console.log(`Connection issue: ${error.message}. Retries left: ${retries}`);
      
      if (retries <= 0) throw error;
      
      console.log(`Waiting ${config.retryDelay}ms before retrying...`);
      await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      
      return axiosWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

// Fetch the current task
async function fetchCurrentTask() {
  try {
    const response = await axiosWithRetry(() => 
      axios.get(`${BASE_URL}/tasks`, {
        params: {
          status: "pending",
          _start: 0,
          _limit: 1
        },
        timeout: config.timeout
      })
    );
    
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetch task');
    throw new Error(`Failed to fetch task: ${error.message}`);
  }
}

// Fetch all tasks with optional filtering
async function fetchTasks(params = {}) {
  try {
    const response = await axiosWithRetry(() => 
      axios.get(`${BASE_URL}/tasks`, { 
        params,
        timeout: config.timeout 
      })
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetch tasks');
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
}

// Update a task
async function updateTask(taskId, updatedTask) {
  try {
    // Update the updated_at timestamp
    updatedTask.updated_at = new Date().toISOString();
    
    const response = await axiosWithRetry(() => 
      axios.put(`${BASE_URL}/tasks/${taskId}`, updatedTask, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: config.timeout
      })
    );
    
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'update task');
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

// Helper function to get a formatted date X days from now
function getFormattedDate(daysFromNow = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Function to add a checklist item to the current task
async function addChecklistItem(textOrArray) {
  try {
    // Get current task
    const tasks = await fetchCurrentTask();
    
    if (!tasks || tasks.length === 0) {
      console.log('No incomplete tasks found');
      return null;
    }
    
    const taskToUpdate = tasks[0];
    const taskId = taskToUpdate.id;
    
    // Initialize checklist array if it doesn't exist
    if (!taskToUpdate.checklist) {
      taskToUpdate.checklist = [];
    }
    
    let itemsToAdd = [];
    
    // Check if the input is a JSON array string
    try {
      const parsedArray = JSON.parse(textOrArray);
      if (Array.isArray(parsedArray)) {
        // If it's an array, create checklist items from each element
        itemsToAdd = parsedArray.map(text => ({
          id: Date.now() + Math.floor(Math.random() * 1000), // Add some randomness to avoid duplicate IDs
          text: text,
          completed: false
        }));
      } else {
        // If it's a parsed object but not an array, treat it as a single item
        itemsToAdd = [{
          id: Date.now(),
          text: textOrArray,
          completed: false
        }];
      }
    } catch (e) {
      // If parsing fails, it's a regular string, treat it as a single item
      itemsToAdd = [{
        id: Date.now(),
        text: textOrArray,
        completed: false
      }];
    }
    
    // Add all the new items to the checklist
    taskToUpdate.checklist.push(...itemsToAdd);
    
    // Update the task
    return await updateTask(taskId, taskToUpdate);
  } catch (error) {
    console.error('Error adding checklist item:', error.message);
    return null;
  }
}

// Standardized error handling for axios errors
function handleAxiosError(error, operation) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(`HTTP Error during ${operation}: ${error.response.status}`);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error(`No response received from server during ${operation}`);
    console.error('Make sure json-server is running at ' + BASE_URL);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(`Error setting up ${operation} request:`, error.message);
  }
}

// Read task data from stdin when provided
async function readStdinData() {
  return new Promise((resolve) => {
    let data = '';
    
    // Only attempt to read from stdin if there's data available
    if (!process.stdin.isTTY) {
      process.stdin.on('data', (chunk) => {
        data += chunk;
      });
      
      process.stdin.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch (error) {
          console.error('Error parsing JSON from stdin:', error.message);
          resolve({});
        }
      });
    } else {
      resolve({});
    }
  });
}

// Execute based on command line arguments
async function main() {
  try {
    const stdinData = await readStdinData();
    
    // Fetch current task command
    if (args.includes('current-task')) {
      const tasks = await fetchCurrentTask();
      console.log(JSON.stringify(tasks, null, 2));
    }
    
    // Add note to current task command
    else if (args.includes('add-note')) {
      const note = args[1]; // Get the note from command line arguments
      
      if (!note) {
        console.error('Please provide a note to add. Usage: node task-current-update.js add-note "your note"');
        process.exit(1);
      }

      // Get current task
      const tasks = await fetchCurrentTask();
      
      if (!tasks || tasks.length === 0) {
        console.log('No incomplete tasks found');
        return;
      }

      const taskToUpdate = tasks[0];
      const taskId = taskToUpdate.id;

      // Update the notes - append new note on a new line
      taskToUpdate.notes = taskToUpdate.notes 
        ? taskToUpdate.notes + '\n' + note 
        : note;

      console.log(`Adding note to task with ID: ${taskId}...`);
      const updatedTask = await updateTask(taskId, taskToUpdate);
      
      console.log('Task updated successfully with new note:');
      console.log(JSON.stringify(updatedTask, null, 2));
    }
    
    // Add description to current task command
    else if (args.includes('add-description')) {
      const description = args[1]; // Get the description from command line arguments
      
      if (!description) {
        console.error('Please provide a description to add. Usage: node task-current-update.js add-description "your description"');
        process.exit(1);
      }

      // Get current task
      const tasks = await fetchCurrentTask();
      
      if (!tasks || tasks.length === 0) {
        console.log('No incomplete tasks found');
        return;
      }

      const taskToUpdate = tasks[0];
      const taskId = taskToUpdate.id;

      // Update the description - append new description on a new line
      taskToUpdate.description = taskToUpdate.description 
        ? taskToUpdate.description + '\n' + description 
        : description;

      console.log(`Adding description to task with ID: ${taskId}...`);
      const updatedTask = await updateTask(taskId, taskToUpdate);
      
      console.log('Task updated successfully with new description:');
      console.log(JSON.stringify(updatedTask, null, 2));
    }
    
    // Set note for current task command
    else if (args.includes('set-note')) {
      const note = args[1]; // Get the note from command line arguments
      
      if (!note) {
        console.error('Please provide a note to set. Usage: node task-current-update.js set-note "your note"');
        process.exit(1);
      }

      // Get current task
      const tasks = await fetchCurrentTask();
      
      if (!tasks || tasks.length === 0) {
        console.log('No incomplete tasks found');
        return;
      }

      const taskToUpdate = tasks[0];
      const taskId = taskToUpdate.id;

      // Directly set the notes
      taskToUpdate.notes = note;

      console.log(`Setting note for task with ID: ${taskId}...`);
      const updatedTask = await updateTask(taskId, taskToUpdate);
      
      console.log('Task updated successfully with new note:');
      console.log(JSON.stringify(updatedTask, null, 2));
    }
    
    // Set description for current task command
    else if (args.includes('set-description')) {
      const description = args[1]; // Get the description from command line arguments
      
      if (!description) {
        console.error('Please provide a description to set. Usage: node task-current-update.js set-description "your description"');
        process.exit(1);
      }

      // Get current task
      const tasks = await fetchCurrentTask();
      
      if (!tasks || tasks.length === 0) {
        console.log('No incomplete tasks found');
        return;
      }

      const taskToUpdate = tasks[0];
      const taskId = taskToUpdate.id;

      // Directly set the description
      taskToUpdate.description = description;

      console.log(`Setting description for task with ID: ${taskId}...`);
      const updatedTask = await updateTask(taskId, taskToUpdate);
      
      console.log('Task updated successfully with new description:');
      console.log(JSON.stringify(updatedTask, null, 2));
    }
    
    // Add checklist item command
    else if (args.includes('add-checklist-item')) {
      const text = args[1]; // Get the text from command line arguments
      
      if (!text) {
        console.error('Please provide text for the checklist item. Usage: node task-current-update.js add-checklist-item "your checklist item" or node task-current-update.js add-checklist-item ["item1", "item2"]');
        process.exit(1);
      }
      
      const updatedTask = await addChecklistItem(text);
      
      if (updatedTask) {
        console.log('Checklist item(s) added successfully:');
        console.log('Updated task:');
        console.log(JSON.stringify(updatedTask, null, 2));
      }
    }
    
    // Get tasks with optional filtering
    else if (args.includes('get-tasks')) {
      // Extract filter parameters from stdin or use defaults
      const params = stdinData.params || {};
      const tasks = await fetchTasks(params);
      console.log(JSON.stringify(tasks, null, 2));
    }
    
    // Update an existing task
    else if (args.includes('update-task')) {
      // If we have task data from stdin, use that to update a specific task
      if (stdinData.id) {
        const updatedTask = await updateTask(stdinData.id, stdinData);
        console.log(JSON.stringify(updatedTask, null, 2));
      } 
      // Otherwise, get and update the first incomplete task
      else {
        console.log('Fetching the first incomplete task...');
        
        const tasks = await fetchCurrentTask();
        
        if (!tasks || tasks.length === 0) {
          console.log('No incomplete tasks found');
          return;
        }
        
        const taskToUpdate = tasks[0];
        const taskId = taskToUpdate.id;
        
        console.log(`Found incomplete task with ID: ${taskId}`);
        console.log('Original task data:');
        console.log(JSON.stringify(taskToUpdate, null, 2));
        
        // If we have update parameters, apply them
        if (stdinData.updateParams) {
          Object.assign(taskToUpdate, stdinData.updateParams);
        } 
        // Otherwise use default behavior - mark all as complete
        else {
          // Update task properties
          taskToUpdate.completed = true;
          taskToUpdate.status = "completed";
          
          // Update all checklist items
          if (taskToUpdate.checklist && Array.isArray(taskToUpdate.checklist)) {
            taskToUpdate.checklist = taskToUpdate.checklist.map(item => ({
              ...item,
              completed: true
            }));
          }
        }
        
        console.log('Updated task data (before saving):');
        console.log(JSON.stringify(taskToUpdate, null, 2));
        
        console.log(`Updating task with ID: ${taskId}...`);
        const updatedTask = await updateTask(taskId, taskToUpdate);
        
        console.log('Task updated successfully on the server:');
        console.log(JSON.stringify(updatedTask, null, 2));
      }
    } 
    else {
      console.log('Available commands:');
      console.log('  current-task - Get the first incomplete task');
      console.log('  add-note "note" - Add a note to the current task');
      console.log('  add-description "description" - Add a description to the current task');
      console.log('  set-note "note" - Set the note for the current task (overwrites existing)');
      console.log('  set-description "description" - Set the description for the current task (overwrites existing)');
      console.log('  get-tasks - lists all tasks');
      console.log('  update-task - Update a task (provide task data via stdin)');
      console.log('  add-checklist-item "item text" - Add a new checklist item to current task');
      console.log('  add-checklist-item ["item1", "item2"] - Add multiple checklist items to current task');
    }
  } catch (error) {
    console.error('Error in execution:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
