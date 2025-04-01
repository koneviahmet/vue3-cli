import http from "./httpjson";

const KanbanServices = {
  getBoards: async () => {
    try {
      const response = await http.get("/kanban-boards");
      return response?.data;
    } catch (e) {}
  },
  
  getBoard: async (id) => {
    try {
      const response = await http.get(`/kanban-boards/${id}`);
      return response?.data;
    } catch (e) {}
  },
  
  addBoard: async (board) => {
    try {
      const response = await http.post("/kanban-boards", board);
      return response?.data;
    } catch (e) {}
  },
  
  updateBoard: async (board) => {
    try {
      const response = await http.put(`/kanban-boards/${board.id}`, board);
      return response?.data;
    } catch (e) {}
  },
  
  deleteBoard: async (id) => {
    try {
      const response = await http.delete(`/kanban-boards/${id}`);
      return response?.data;
    } catch (e) {}
  },
  
  getTasks: async () => {
    try {
      const response = await http.get("/kanban-tasks");
      return response?.data;
    } catch (e) {}
  },
  
  addTask: async (task) => {
    try {
      const response = await http.post("/kanban-tasks", task);
      return response?.data;
    } catch (e) {}
  },
  
  updateTask: async (task) => {
    try {
      const response = await http.put(`/kanban-tasks/${task.id}`, task);
      return response?.data;
    } catch (e) {}
  },
  
  deleteTask: async (id) => {
    try {
      const response = await http.delete(`/kanban-tasks/${id}`);
      return response?.data;
    } catch (e) {}
  },
};

export default KanbanServices; 