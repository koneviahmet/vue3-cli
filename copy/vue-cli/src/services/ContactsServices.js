import http from "./http";

const ContactsServices = {
  getItems: async () => {
    try {
      const response = await http.get("/contacts");
      return response?.data;
    } catch (error) {
      console.error("Error in getItems:", error);
      return { error: error.message || "Failed to fetch contacts" };
    }
  },
  
  searchItems: async (obj) => {
    try {
      // Implement proper search query based on obj parameters
      let queryParams = "";
      
      if (obj && Object.keys(obj).length > 0) {
        queryParams = "?";
        Object.entries(obj).forEach(([key, value], index) => {
          if (index > 0) queryParams += "&";
          queryParams += `${key}=${encodeURIComponent(value)}`;
        });
      }
      
      const response = await http.get(`/contacts${queryParams}`);
      return response?.data;
    } catch (error) {
      console.error("Error in searchItems:", error);
      return { error: error.message || "Failed to search contacts" };
    }
  },
  
  getItem: async (obj) => {
    try {
      const response = await http.get(`/contacts/${obj.id}`);
      return response?.data;
    } catch (error) {
      console.error("Error in getItem:", error);
      return { error: error.message || "Failed to fetch contact details" };
    }
  },
  
  addItem: async (obj) => {
    try {
      const response = await http.post("/contacts", obj);
      return response?.data;
    } catch (error) {
      console.error("Error in addItem:", error);
      return { error: error.message || "Failed to add contact" };
    }
  },
  
  updateItem: async (obj) => {
    try {
      const response = await http.put(`/contacts/${obj.id}`, obj);
      return response?.data;
    } catch (error) {
      console.error("Error in updateItem:", error);
      return { error: error.message || "Failed to update contact" };
    }
  },
  
  deleteItem: async (obj) => {
    try {
      const response = await http.delete(`/contacts/${obj.id}`);
      return response?.data;
    } catch (error) {
      console.error("Error in deleteItem:", error);
      return { error: error.message || "Failed to delete contact" };
    }
  },
};

export default ContactsServices;
