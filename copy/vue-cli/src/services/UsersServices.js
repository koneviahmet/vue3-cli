import http from "./http";

const UsersServices = {
  getItems: async () => {
    try {
      const response = await http.get("/users");
      return response?.data;
    } catch (e) {}
  },
  searchItems: async (obj) => {
    try {
      const response = await http.get("/users");
      return response?.data;
    } catch (e) {}
  },
  getItem: async (obj) => {
    try {
      const response = await http.get(`/users/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
  loginItem: async (obj) => {
    try {
      const response = await http.get(`/users`, {params: obj});
      return response?.data;
    } catch (e) {}
  },
  addItem: async (obj) => {
    try {
      const response = await http.post("/users", obj);
      return response?.data;
    } catch (e) {}
  },
  updateItem: async (id, obj) => {
    try {
      const response = await http.put(`/users/${id}`, obj);
      return response?.data;
    } catch (e) {}
  },
  deleteItem: async (obj) => {
    try {
      const response = await http.delete(`/users/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
};

export default UsersServices;
