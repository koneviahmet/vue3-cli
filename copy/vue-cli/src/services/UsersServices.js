import http from "./http";

const UsersServices = {
  getUsers: async () => {
    try {
      const response = await http.get("/users");
      return response?.data;
    } catch (e) {}
  },
  searchUsers: async (obj) => {
    try {
      const response = await http.get("/users");
      return response?.data;
    } catch (e) {}
  },
  getUser: async (obj) => {
    try {
      const response = await http.get(`/users/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
  addUser: async (obj) => {
    try {
      const response = await http.post("/users", obj);
      return response?.data;
    } catch (e) {}
  },
  updateUser: async (id, obj) => {
    try {
      const response = await http.put(`/users/${id}`, obj);
      return response?.data;
    } catch (e) {}
  },
  deleteUser: async (obj) => {
    try {
      const response = await http.delete(`/users/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
};

export default UsersServices;
