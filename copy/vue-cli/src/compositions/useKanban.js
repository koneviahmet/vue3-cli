import { ref, reactive, computed } from "vue";
import KanbanServices from "../services/json-services/KanbanServices.js";

import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";



export default function useKanban() {
  const loading = ref(false);
  const error = ref(null);
  
  // State for boards and tasks
  const state = reactive({
    boards: [],
    tasks: []
  });
  
  // Get all boards
  const getBoards = async () => {
    loading.value = true;
    try {
      const boards = await KanbanServices.getBoards();
      if (boards) {
        state.boards = boards;
      }
      loading.value = false;
      return boards;
    } catch (err) {
      loading.value = false;
      error.value = err;
      return null;
    }
  };
  
  // Get a specific board
  const getBoard = async (id) => {
    loading.value = true;
    try {
      const board = await KanbanServices.getBoard(id);
      loading.value = false;
      return board;
    } catch (err) {
      loading.value = false;
      error.value = err;
      return null;
    }
  };
  
  // Add a new board
  const addBoard = async (board) => {
    loading.value = true;
    try {
      const newBoard = await KanbanServices.addBoard(board);
      if (newBoard) {
        state.boards.push(newBoard);
        notyfSuccess("Board created successfully");
      }
      loading.value = false;
      return newBoard;
    } catch (err) {
      loading.value = false;
      error.value = err;
      notyfError("Failed to create board");
      return null;
    }
  };
  
  // Update a board
  const updateBoard = async (board) => {
    loading.value = true;
    try {
      const updatedBoard = await KanbanServices.updateBoard(board);
      if (updatedBoard) {
        const index = state.boards.findIndex(b => b.id === updatedBoard.id);
        if (index !== -1) {
          state.boards[index] = updatedBoard;
        }
        notyfSuccess("Board updated successfully");
      }
      loading.value = false;
      return updatedBoard;
    } catch (err) {
      loading.value = false;
      error.value = err;
      notyfError("Failed to update board");
      return null;
    }
  };
  
  // Delete a board
  const deleteBoard = async (id) => {
    return new Promise(async (resolve) => {
      Alert.showPrompt("Are you sure you want to delete this board?").then(async (res) => {
        if(!res.isConfirmed) {
          notyfError("Deletion cancelled");
          resolve(false);
        } else {
          loading.value = true;
          try {
            await KanbanServices.deleteBoard(id);
            state.boards = state.boards.filter(b => b.id !== id);
            notyfSuccess("Board deleted successfully");
            loading.value = false;
            resolve(true);
          } catch (err) {
            loading.value = false;
            error.value = err;
            notyfError("Failed to delete board");
            resolve(false);
          }
        }
      });
    });
  };
  
  // Get all tasks
  const getTasks = async () => {
    loading.value = true;
    try {
      const tasks = await KanbanServices.getTasks();
      if (tasks) {
        state.tasks = tasks;
      }
      loading.value = false;
      return tasks;
    } catch (err) {
      loading.value = false;
      error.value = err;
      return null;
    }
  };
  
  // Add a new task
  const addTask = async (task) => {
    loading.value = true;
    try {
      const newTask = await KanbanServices.addTask(task);
      if (newTask) {
        state.tasks.push(newTask);
        notyfSuccess("Task created successfully");
      }
      loading.value = false;
      return newTask;
    } catch (err) {
      loading.value = false;
      error.value = err;
      notyfError("Failed to create task");
      return null;
    }
  };
  
  // Update a task
  const updateTask = async (task) => {
    loading.value = true;
    try {
      const updatedTask = await KanbanServices.updateTask(task);
      if (updatedTask) {
        const index = state.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
        notyfSuccess("Task updated successfully");
      }
      loading.value = false;
      return updatedTask;
    } catch (err) {
      loading.value = false;
      error.value = err;
      notyfError("Failed to update task");
      return null;
    }
  };
  
  // Delete a task
  const deleteTask = async (id) => {
    return new Promise(async (resolve) => {
      Alert.showPrompt("Are you sure you want to delete this task?").then(async (res) => {
        if(!res.isConfirmed) {
          notyfError("Deletion cancelled");
          resolve(false);
        } else {
          loading.value = true;
          try {
            await KanbanServices.deleteTask(id);
            state.tasks = state.tasks.filter(t => t.id !== id);
            notyfSuccess("Task deleted successfully");
            loading.value = false;
            resolve(true);
          } catch (err) {
            loading.value = false;
            error.value = err;
            notyfError("Failed to delete task");
            resolve(false);
          }
        }
      });
    });
  };
  
  // Move a task to another column
  const moveTask = async (taskId, newColumnId) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return null;
    
    const updatedTask = { ...task, columnId: newColumnId };
    return await updateTask(updatedTask);
  };
  
  // Get tasks by column
  const getTasksByColumn = (columnId) => {
    return computed(() => state.tasks.filter(t => t.columnId === columnId));
  };
  
  // Get user
  const user = computed(() => {
    return store.getters._getCurrentUser;
  });

  return {
    loading,
    error,
    boards: computed(() => state.boards),
    tasks: computed(() => state.tasks),
    getBoards,
    getBoard,
    addBoard,
    updateBoard,
    deleteBoard,
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByColumn,
    user
  };
} 