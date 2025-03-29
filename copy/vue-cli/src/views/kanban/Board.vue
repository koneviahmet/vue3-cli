<template>
  <div class="kanban-board p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Kanban Board</h1>
      
      <div class="flex gap-3">
        <button class="btn btn-primary" @click="openColumnForm(null)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Column
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>
    
    <div v-else-if="columns.length === 0" class="flex flex-col items-center justify-center h-64 bg-base-200 rounded-lg">
      <div class="text-xl font-semibold text-gray-500">No columns available</div>
      <p class="text-gray-400 mb-4">Get started by creating your first column</p>
      <button class="btn btn-primary" @click="openColumnForm(null)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Column
      </button>
    </div>
    
    <div v-else class="overflow-x-auto">
      <div class="flex gap-4 pb-4">
        <KanbanColumn 
          v-for="column in sortedColumns" 
          :key="column.id"
          :column="column"
          :tasks="getTasksByColumn(column.id)"
          @add-task="openTaskForm(null, column.id)"
          @edit-column="openColumnForm(column)"
          @delete-column="confirmDeleteColumn(column)"
          @view-task="openTaskDetail"
          @move-task="handleMoveTask"
        />
      </div>
    </div>
    
    <!-- Task Detail Modal -->
    <div class="modal" :class="{ 'modal-open': selectedTask }">
      <div class="modal-box max-w-4xl">
        <button class="btn btn-sm btn-circle absolute right-2 top-2" @click="selectedTask = null">✕</button>
        <TaskDetail 
          v-if="selectedTask"
          :task="selectedTask"
          :users="users"
          @edit="openTaskForm(selectedTask)"
          @delete="confirmDeleteTask(selectedTask.id)"
          @update="updateTask"
        />
      </div>
    </div>
    
    <!-- Task Form Modal -->
    <div class="modal" :class="{ 'modal-open': showTaskForm }">
      <div class="modal-box max-w-3xl">
        <button class="btn btn-sm btn-circle absolute right-2 top-2" @click="showTaskForm = false">✕</button>
        <h3 class="font-bold text-xl mb-4">{{ taskFormMode === 'edit' ? 'Edit Task' : 'Create New Task' }}</h3>
        <TaskForm 
          v-if="showTaskForm"
          :task="taskFormMode === 'edit' ? selectedTask : null"
          :column-id="selectedColumnId"
          :user="user"
          @submit="handleTaskFormSubmit"
          @cancel="showTaskForm = false"
        />
      </div>
    </div>
    
    <!-- Column Form Modal -->
    <div class="modal" :class="{ 'modal-open': showColumnForm }">
      <div class="modal-box">
        <button class="btn btn-sm btn-circle absolute right-2 top-2" @click="showColumnForm = false">✕</button>
        <h3 class="font-bold text-xl mb-4">{{ columnFormMode === 'edit' ? 'Edit Column' : 'Create New Column' }}</h3>
        <ColumnForm 
          v-if="showColumnForm"
          :column="columnFormMode === 'edit' ? selectedColumn : null"
          :board-id="defaultBoardId"
          @submit="handleColumnFormSubmit"
          @cancel="showColumnForm = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import useKanban from '../../compositions/useKanban';
import KanbanColumn from './components/KanbanColumn.vue';
import TaskForm from './components/TaskForm.vue';
import TaskDetail from './components/TaskDetail.vue';
import ColumnForm from './components/ColumnForm.vue';
import Alert from "../../utils/alert.js";

// Get Kanban data and methods
const { 
  loading, 
  error, 
  boards, 
  tasks: allTasks,
  getBoards, 
  getTasks, 
  addTask, 
  updateTask, 
  deleteTask,
  moveTask,
  addBoard,
  updateBoard,
  deleteBoard,
  user
} = useKanban();

// State
const columns = ref([]);
const showTaskForm = ref(false);
const showColumnForm = ref(false);
const taskFormMode = ref('create');
const columnFormMode = ref('create');
const selectedTask = ref(null);
const selectedColumn = ref(null);
const selectedColumnId = ref(null);
const defaultBoardId = ref(1); // Default board ID

// Computed
const sortedColumns = computed(() => {
  return [...columns.value].sort((a, b) => a.order - b.order);
});

const users = computed(() => {
  return [user.value]; // For now, just return current user
});

const getTasksByColumn = (columnId) => {
  return allTasks.value.filter(task => task.columnId === columnId);
};

// Lifecycle
onMounted(async () => {
  await fetchData();
});

// Methods
const fetchData = async () => {
  try {
    const boards = await getBoards();
    if (boards && boards.length > 0) {
      defaultBoardId.value = boards[0].id;
      columns.value = boards[0].columns || [];
    } else {
      // Create default board and columns if none exist
      await createDefaultBoard();
    }
    
    await getTasks();
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

const createDefaultBoard = async () => {
  const newBoard = await addBoard({
    title: 'Main Board',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    columns: []
  });
  
  if (newBoard) {
    defaultBoardId.value = newBoard.id;
    
    // Create default columns
    const todoColumn = await addColumn({
      title: 'To Do',
      order: 0,
      boardId: newBoard.id
    });
    
    const inProgressColumn = await addColumn({
      title: 'In Progress',
      order: 1,
      boardId: newBoard.id
    });
    
    const doneColumn = await addColumn({
      title: 'Done',
      order: 2,
      boardId: newBoard.id
    });
    
    columns.value = [todoColumn, inProgressColumn, doneColumn].filter(Boolean);
  }
};

const addColumn = async (column) => {
  const newColumn = await updateBoard({
    id: defaultBoardId.value,
    title: 'Main Board',
    columns: [...columns.value, column]
  });
  
  if (newColumn && newColumn.columns) {
    columns.value = newColumn.columns;
    return column;
  }
  
  return null;
};

const openTaskForm = (task, columnId = null) => {
  if (task) {
    selectedTask.value = task;
    taskFormMode.value = 'edit';
  } else {
    selectedTask.value = null;
    taskFormMode.value = 'create';
    selectedColumnId.value = columnId;
  }
  
  showTaskForm.value = true;
};

const openTaskDetail = (task) => {
  selectedTask.value = task;
};

const openColumnForm = (column = null) => {
  if (column) {
    selectedColumn.value = column;
    columnFormMode.value = 'edit';
  } else {
    selectedColumn.value = null;
    columnFormMode.value = 'create';
  }
  
  showColumnForm.value = true;
};

const handleTaskFormSubmit = async (taskData) => {
  try {
    if (taskFormMode.value === 'edit') {
      await updateTask(taskData);
    } else {
      await addTask(taskData);
    }
    
    showTaskForm.value = false;
    selectedTask.value = null;
  } catch (err) {
    console.error('Error saving task:', err);
  }
};

const handleColumnFormSubmit = async (columnData) => {
  try {
    const updatedColumns = [...columns.value];
    
    if (columnFormMode.value === 'edit') {
      const index = updatedColumns.findIndex(c => c.id === columnData.id);
      if (index !== -1) {
        updatedColumns[index] = columnData;
      }
    } else {
      // Generate a unique ID for the new column
      columnData.id = Date.now();
      updatedColumns.push(columnData);
    }
    
    const updatedBoard = await updateBoard({
      id: defaultBoardId.value,
      columns: updatedColumns
    });
    
    if (updatedBoard && updatedBoard.columns) {
      columns.value = updatedBoard.columns;
    }
    
    showColumnForm.value = false;
    selectedColumn.value = null;
  } catch (err) {
    console.error('Error saving column:', err);
  }
};

const confirmDeleteTask = async (taskId) => {
  Alert.showPrompt("Are you sure you want to delete this task? This action cannot be undone.").then(async (res) => {
    if (res.isConfirmed) {
      const success = await deleteTask(taskId);
      if (success) {
        selectedTask.value = null;
      }
    }
  });
};

const confirmDeleteColumn = async (column) => {
  // Sütundaki görevleri kontrol et
  const tasksInColumn = getTasksByColumn(column.id);
  
  if (tasksInColumn.length > 0) {
    // Sütunda görev varsa uyarı ver
    Alert.showWarning("Bu kolonu silebilmek için önce içindeki tüm görevleri silmeli veya başka bir kolona taşımalısınız.");
    return;
  }
  
  Alert.showPrompt(`"${column.title}" kolonunu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`).then(async (res) => {
    if (res.isConfirmed) {
      try {
        const updatedColumns = columns.value.filter(c => c.id !== column.id);
        
        const updatedBoard = await updateBoard({
          id: defaultBoardId.value,
          columns: updatedColumns
        });
        
        if (updatedBoard && updatedBoard.columns) {
          columns.value = updatedBoard.columns;
        }
      } catch (err) {
        console.error('Error deleting column:', err);
        Alert.showError("Kolon silinirken bir hata oluştu.");
      }
    }
  });
};

const handleMoveTask = async (taskId, newColumnId) => {
  await moveTask(taskId, newColumnId);
};
</script>

<style scoped>
.kanban-board {
  min-height: calc(100vh - 80px);
}
</style> 