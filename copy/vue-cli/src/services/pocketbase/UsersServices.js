import pb from "../pocketbase";
import AuthServices from '@/services/pocketbase/AuthServices';

const UsersServices = {
  getItems: async () => {
    try {
      const records = await pb.collection('users').getFullList();
      return records;
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  },
  searchItems: async (obj) => {
    try {
      // Convert obj to filter conditions for PocketBase
      const filter = Object.entries(obj)
        .map(([key, value]) => `${key} ~ "${value}"`)
        .join(' && ');
      
      const records = await pb.collection('users').getList(1, 50, {
        filter: filter || "",
      });
      
      return records.items;
    } catch (e) {
      console.error("Error searching users:", e);
    }
  },
  getItem: async (obj) => {    
    try {
      const record = await pb.collection('users').getOne(obj.id);
      return { ...record };
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  },
  loginItem: async (obj) => {
    try {
      // PocketBase authentication 
      const authData = await pb.collection('users').authWithPassword(
        obj.email,
        obj.password
      );
      
      return authData.record;
    } catch (e) {
      console.error("Login error:", e);
    }
  },
  addItem: async (obj) => {
    const data = {
        "username": obj.username,
        "email": obj.email,
        "emailVisibility": false,
        "password": obj.password,
        "passwordConfirm": obj.password,
        "name": obj.name,
        "role": obj.role
    };
    try {
      const record = await pb.collection('users').create(data);
      return record;
    } catch (e) {
      console.error("Error creating user:", e);
    }
  },
  updateItem: async (id, obj) => {    
    try {
      const record = await pb.collection('users').update(id, {
        ...obj,
        username: obj.username
      });
      return record;
    } catch (e) {
      console.error("Error updating user:", e);
    }
  },
  deleteItem: async (obj) => {
    try {
      await pb.collection('users').delete(obj.id);
      return { success: true };
    } catch (e) {
      console.error("Error deleting user:", e);
      return { success: false, error: e };
    }
  },  
  logOut: async () => {
    try {
      await AuthServices.logout();
      return { success: true };
    } catch (e) {
      console.error("Error logout user:", e);
      return { success: false, error: e };
    }
  }
};

export default UsersServices;
