import pb from "../pocketbase";


/**
 * Generic PocketBase service for CRUD operations on collections
 * const result = await getItems("library_books", {
  filter: 'school_id = "abc123" && status = "available" && (genre = "fiction" || genre = "science")',
  sort: '-created'
});
 * 
 * 
 * 
 */
const PocketBaseService = {
  getItems: async (collection, options = {}) => {
    
    try {
      const page = options.page || 1;
      const perPage = options.perPage || 20;
      const sort = options.sort || '';
      const filter = options.filter || '';
      const expand = options.expand || '';
      
      // If options is empty or options.getAll is true, return all records
      if (options.getAll || Object.keys(options).length === 0) {
        const records = await pb.collection(collection).getFullList({
          filter: filter,
          sort: sort,
          expand: expand,
        });
        return records;
      }
      
      // Otherwise, paginate the results
      const resultList = await pb.collection(collection).getList(page, perPage, {
        filter: filter,
        sort: sort,
        expand: expand
      });

      // Return both items and pagination info
      return {
        items: resultList.items,
        totalItems: resultList.totalItems,
        totalPages: resultList.totalPages,
        page: resultList.page
      };
    } catch (e) {
      console.error(`Error fetching ${collection}:`, e);
      throw e; // Rethrow the error to allow proper error handling upstream
    }
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
  getItem: async (collection, {id}, options = {}) => {

    try {
      const expand = options.expand || '';
      
      // Handle backward compatibility - if id is an object with an id property
      const recordId = typeof id === 'object' && id !== null ? id.id : id;
      
      const record = await pb.collection(collection).getOne(recordId, {
        expand: expand
      });
      return record;
    } catch (e) {
      console.error(`Error fetching ${collection} item:`, e);
      return { error: e.message };
    }
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