import pb from "../pocketbase";

/**
 * Generic PocketBase service for CRUD operations on collections
 */
const PocketBaseService = {
  getItems: async (collection) => {
    try {
      const records = await pb.collection(collection).getFullList();
      return records;
    } catch (e) {}
  },
  searchItems: async (collection, obj) => {
    try {
      // Convert search object to filter string
      const filter = Object.entries(obj)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${key} ~ "${value}"`)
        .join(' && ');
      
      const records = await pb.collection(collection).getList(1, 50, {
        filter: filter || "",
      });
      
      return records.items;
    } catch (e) {}
  },
  getItem: async (collection, obj) => {
    try {
      const record = await pb.collection(collection).getOne(obj.id);
      return record;
    } catch (e) {}
  },
  addItem: async (collection, obj) => {
    console.log(collection,"-", obj);
    
    try {
      const record = await pb.collection(collection).create(obj);
      return record;
    } catch (e) {}
  },
  updateItem: async (collection, obj) => {
    try {
      const record = await pb.collection(collection).update(obj.id, obj);
      return record;
    } catch (e) {}
  },
  deleteItem: async (collection, obj) => {
    try {
      await pb.collection(collection).delete(obj.id);
      return { success: true };
    } catch (e) {}
  }
};

export default PocketBaseService; 