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

// Create a new task
async function createTask(taskData) {
  try {
    // Set default values if not provided
    const newTask = {
      status: "pending",
      priority: "medium",
      due_date: getFormattedDate(7), // Default due date is 7 days from now
      completed: false,
      tags: [],
      checklist: [],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      assigned_to: 1,
      ...taskData
    };

    const response = await axiosWithRetry(() => 
      axios.post(`${BASE_URL}/tasks`, newTask, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: config.timeout
      })
    );
    
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'create task');
    throw new Error(`Failed to create task: ${error.message}`);
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
    
    // Get tasks with optional filtering
    else if (args.includes('get-tasks')) {
      // Extract filter parameters from stdin or use defaults
      const params = stdinData.params || {};
      const tasks = await fetchTasks(params);
      console.log(JSON.stringify(tasks, null, 2));
    }
    
    // Create a new task
    else if (args.includes('create-task')) {
      if (Object.keys(stdinData).length === 0) {
        console.error('No task data provided. Please provide task data via stdin.');
        process.exit(1);
      }
      
      const newTask = await createTask(stdinData);
      console.log(JSON.stringify(newTask, null, 2));
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
      console.log('  get-tasks - Get tasks with optional filtering (provide params via stdin)');
      console.log('  create-task - Create a new task (provide task data via stdin)');
      console.log('  update-task - Update a task (provide task data via stdin)');
    }
  } catch (error) {
    console.error('Error in execution:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
