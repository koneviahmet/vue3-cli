import http from "./httpjson";

const CalendarServices = {
  getEvents: async () => {
    try {
      // For now, we'll use tasks and kanban-tasks as our calendar events
      const taskResponse = await http.get("/tasks");
      const kanbanTaskResponse = await http.get("/kanban-tasks");
      
      return {
        tasks: taskResponse?.data || [],
        kanbanTasks: kanbanTaskResponse?.data || []
      };
    } catch (e) {}
  },
  
  addEvent: async (obj) => {
    try {
      // Determine if this should be a regular task or kanban task based on the event type
      if (obj.eventType === 'task') {
        const response = await http.post("/tasks", {
          ...obj.eventData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        return response?.data;
      } else if (obj.eventType === 'kanban') {
        const response = await http.post("/kanban-tasks", {
          ...obj.eventData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        return response?.data;
      }
    } catch (e) {}
  },
  
  updateEvent: async (obj) => {
    try {
      // Determine which endpoint to use based on event type
      if (obj.eventType === 'task') {
        const response = await http.put(`/tasks/${obj.eventData.id}`, {
          ...obj.eventData,
          updated_at: new Date().toISOString()
        });
        return response?.data;
      } else if (obj.eventType === 'kanban') {
        const response = await http.put(`/kanban-tasks/${obj.eventData.id}`, {
          ...obj.eventData,
          updated_at: new Date().toISOString()
        });
        return response?.data;
      }
    } catch (e) {}
  },
  
  deleteEvent: async (obj) => {
    try {
      // Determine which endpoint to use based on event type
      if (obj.eventType === 'task') {
        const response = await http.delete(`/tasks/${obj.id}`);
        return response?.data;
      } else if (obj.eventType === 'kanban') {
        const response = await http.delete(`/kanban-tasks/${obj.id}`);
        return response?.data;
      }
    } catch (e) {}
  }
};

export default CalendarServices; 