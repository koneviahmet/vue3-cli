import { ref, reactive, computed } from "vue";
import useModelTasks from "./useModelTasks";
import useKanban from "./useKanban";
import { notyfError, notyfSuccess } from "../utils/notyf.js";
import store from "../store/index.js";
import Services from "../services/index";



export function useCalendar() {
  const loading = ref(false);
  const events = reactive({
    items: []
  });
  const error = ref(null);
  const tasksModel = useModelTasks();
  const kanbanModel = useKanban();
  
  // Get current user
  const user = computed(() => {
    return store.getters._getCurrentUser;
  });

  // Function to convert task and kanban items to calendar events
  const transformToCalendarEvents = (tasks = [], kanbanTasks = []) => {
    const taskEvents = tasks.map(task => ({
      id: `task-${task.id}`,
      title: task.title,
      description: task.description || '',
      start: task.due_date ? new Date(task.due_date) : new Date(),
      end: task.due_date ? new Date(task.due_date) : new Date(),
      allDay: true,
      color: getColorByPriority(task.priority),
      type: 'task',
      originalData: task
    }));

    const kanbanEvents = kanbanTasks.map(task => ({
      id: `kanban-${task.id}`,
      title: task.title,
      description: task.description || '',
      start: task.dueDate ? new Date(task.dueDate) : new Date(),
      end: task.dueDate ? new Date(task.dueDate) : new Date(),
      allDay: true,
      color: getColorByPriority(task.priority),
      type: 'kanban',
      originalData: task
    }));

    return [...taskEvents, ...kanbanEvents];
  };

  // Helper function to get color based on priority
  const getColorByPriority = (priority) => {
    switch (priority) {
      case 'high':
        return '#EF4444'; // red-500
      case 'medium':
        return '#F59E0B'; // amber-500
      case 'low':
        return '#3B82F6'; // blue-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  // Fetch all events (tasks and kanban tasks)
  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const taskResult = await tasksModel.getItems();
      const kanbanTasksResult = await kanbanModel.getTasks();
      
      const calendarEvents = transformToCalendarEvents(taskResult, kanbanTasksResult);
      events.items = calendarEvents;
      
      loading.value = false;
      return calendarEvents;
    } catch (err) {
      loading.value = false;
      error.value = err;
      return [];
    }
  };

  // Add a new event
  const addEvent = async (eventData) => {
    loading.value = true;
    error.value = null;
    
    try {
      let result;
      
      if (eventData.type === 'task') {
        // Transform calendar event to task format
        const taskData = {
          title: eventData.title,
          description: eventData.description || '',
          status: 'pending',
          priority: eventData.priority || 'medium',
          due_date: eventData.start ? new Date(eventData.start).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          notes: '',
          completed: false,
          tags: eventData.tags || [],
          checklist: [],
          assigned_to: user.value?.id || 1
        };
        
        result = await tasksModel.addItem(taskData);
        notyfSuccess("Task added successfully");
      } else if (eventData.type === 'kanban') {
        // Transform calendar event to kanban task format
        const kanbanData = {
          title: eventData.title,
          description: eventData.description || '',
          priority: eventData.priority || 'medium',
          dueDate: eventData.start ? new Date(eventData.start).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          tags: eventData.tags || [],
          checklist: [],
          columnId: 1, // Default to first column (To Do)
          assignedTo: user.value?.id || 1
        };
        
        result = await kanbanModel.addTask(kanbanData);
        notyfSuccess("Kanban task added successfully");
      }
      
      loading.value = false;
      await fetchEvents(); // Refresh events
      return result;
    } catch (err) {
      loading.value = false;
      error.value = err;
      notyfError("Failed to add event");
      return null;
    }
  };

  // Update an existing event
  const updateEvent = async (eventData) => {
    loading.value = true;
    error.value = null;
    
    try {
      let result;
      
      if (eventData.type === 'task') {
        const taskId = eventData.id.replace('task-', '');
        // Get original task data
        const originalTask = await tasksModel.getItem({ id: taskId });
        
        // Update with new data
        const taskData = {
          ...originalTask,
          title: eventData.title,
          description: eventData.description || originalTask.description,
          priority: eventData.priority || originalTask.priority,
          due_date: eventData.start ? new Date(eventData.start).toISOString().split('T')[0] : originalTask.due_date,
          id: taskId
        };
        
        result = await tasksModel.updateItem(taskData);
        notyfSuccess("Task updated successfully");
      } else if (eventData.type === 'kanban') {
        const kanbanId = eventData.id.replace('kanban-', '');
        // Get original kanban task
        const originalTask = await kanbanModel.getTask(kanbanId);
        
        // Update with new data
        const kanbanData = {
          ...originalTask,
          title: eventData.title,
          description: eventData.description || originalTask.description,
          priority: eventData.priority || originalTask.priority,
          dueDate: eventData.start ? new Date(eventData.start).toISOString().split('T')[0] : originalTask.dueDate,
          id: kanbanId
        };
        
        result = await kanbanModel.updateTask(kanbanData);
        notyfSuccess("Kanban task updated successfully");
      }
      
      loading.value = false;
      await fetchEvents(); // Refresh events
      return result;
    } catch (err) {
      loading.value = false;
      error.value = err;
      notyfError("Failed to update event");
      return null;
    }
  };

  // Delete an event
  const deleteEvent = async (eventData) => {
    loading.value = true;
    error.value = null;
    
    try {
      let result;
      
      if (eventData.type === 'task') {
        const taskId = eventData.id.replace('task-', '');
        result = await tasksModel.deleteItem({ id: taskId });
        notyfSuccess("Task deleted successfully");
      } else if (eventData.type === 'kanban') {
        const kanbanId = eventData.id.replace('kanban-', '');
        result = await kanbanModel.deleteTask(kanbanId);
        notyfSuccess("Kanban task deleted successfully");
      }
      
      loading.value = false;
      await fetchEvents(); // Refresh events
      return result;
    } catch (err) {
      loading.value = false;
      error.value = err;
      notyfError("Failed to delete event");
      return null;
    }
  };

  return {
    loading,
    events,
    error,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getColorByPriority
  };
} 