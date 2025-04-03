import http from "../httpjson";

const GlobalServices = {
  getItems: async (table) => {
    try {
      const response = await http.get(`/${table}`);
      return response?.data;
    } catch (e) {}
  },
  searchItems: async (table, obj) => {
    try {
      const response = await http.get(`/${table}`);
      return response?.data;
    } catch (e) {}
  },
  getItem: async (table, obj) => {
    try {
      const response = await http.get(`/${table}/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
  addItem: async (table, obj) => {    
    try {
      const response = await http.post(`/${table}`, obj);
      return response?.data;
    } catch (e) {}
  },
  updateItem: async (table, obj) => {
    try {
      const response = await http.put(`/${table}/${obj.id}`, obj);
      return response?.data;
    } catch (e) {}
  },
  deleteItem: async (table, obj) => {
    try {
      const response = await http.delete(`/${table}/${obj.id}`);
      return response?.data;
    } catch (e) {}
  },
};

export default GlobalServices;
