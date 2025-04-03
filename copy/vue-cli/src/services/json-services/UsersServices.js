import http from "../httpjson";

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
      return response?.data?.[0];
    } catch (e) {}
  },
  addItem: async (obj) => {
    try {
      const response = await http.post("/users", {...obj, role: 2});
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
  logOut: async () => {
    return true;
  },
};

export default UsersServices;
