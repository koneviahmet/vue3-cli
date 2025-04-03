import http from "../httpjson";

const TasksServices = {
  getItems: async () => {
    try {
      const response = await http.get("/tasks");
      return response?.data;
    } catch (e) {}
  },
  searchItems: async (obj) => {
    try {
      const response = await http.get("/tasks");
      return response?.data;
    } catch (e) {}
  },
  getItem: async (obj) => {
    try {
      const response = await http.get(`/tasks/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
  addItem: async (obj) => {
    try {
      const response = await http.post("/tasks", obj);
      return response?.data;
    } catch (e) {}
  },
  updateItem: async (obj) => {
    try {
      const response = await http.put(`/tasks/${obj.id}`, obj);
      return response?.data;
    } catch (e) {}
  },
  deleteItem: async (obj) => {
    try {
      const response = await http.delete(`/tasks/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
};

export default TasksServices; 