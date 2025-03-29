import http from "./http";

const ContactServices = {
  submitContactForm: async (formData) => {
    try {
      const response = await http.post("/contacts", formData);
      return response?.data;
    } catch (e) {
      throw e;
    }
  },
  
  getContacts: async () => {
    try {
      const response = await http.get("/contacts");
      return response?.data;
    } catch (e) {
      throw e;
    }
  },
  
  getContact: async (id) => {
    try {
      const response = await http.get(`/contacts/${id}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  },
  
  updateContactStatus: async (id, status) => {
    try {
      const contact = await ContactServices.getContact(id);
      contact.contact_status = status;
      contact.contact_updated_at = new Date().toISOString();
      
      const response = await http.put(`/contacts/${id}`, contact);
      return response?.data;
    } catch (e) {
      throw e;
    }
  },
  
  deleteContact: async (id) => {
    try {
      const response = await http.delete(`/contacts/${id}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  }
};

export default ContactServices; 