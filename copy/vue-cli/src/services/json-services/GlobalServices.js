import http from "../httpjson";

/**
 * Generic JSON Server service for CRUD operations on collections
 * Example usage:
 * const result = await getItems("books", {
 *   sort: "price", 
 *   order: "asc",
 *   page: 1,
 *   perPage: 10,
 *   filter: { authorId: 123, genre: "fiction" }
 * });
 */
const GlobalServices = {
  getItems: async (table, options = {}) => {
    try {
      const page = options.page || 1;
      const perPage = options.perPage || 20;
      const sort = options.sort || '';
      const order = options.order || 'asc';
      const filter = options.filter || {};

      let url = `/${table}`;
      let params = new URLSearchParams();
      
      // Add sorting if provided
      if (sort) {
        params.append('_sort', sort);
        params.append('_order', order);
      }
      
      // Add pagination if we're not getting all records
      if (!options.getAll) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        params.append('_start', start);
        params.append('_end', end);
      }
      
      // Add filter parameters
      Object.entries(filter).forEach(([key, value]) => {
        params.append(key, value);
      });
      
      // Append params if any exist
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await http.get(url);
      
      // If pagination is used, return both items and pagination info
      if (!options.getAll) {
        // JSON server returns total count in response headers
        const totalItems = parseInt(response.headers['x-total-count'] || 0);
        const totalPages = Math.ceil(totalItems / perPage);
        
        return {
          items: response.data,
          totalItems,
          totalPages,
          page
        };
      }
      
      return response.data;
    } catch (e) {
      console.error(`Error fetching ${table}:`, e);
      throw e;
    }
  },
  
  searchItems: async (table, obj = {}) => {
    try {
      // Build query params from search object
      let params = new URLSearchParams();
      
      // Add search parameters
      Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key + '_like', value); // '_like' for partial matches in json-server
        }
      });
      
      let url = `/${table}`;
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await http.get(url);
      return response.data;
    } catch (e) {
      console.error(`Error searching ${table}:`, e);
      return [];
    }
  },
  
  getItem: async (table, obj) => {
    try {
      // Handle both object with id and direct id parameter
      const id = typeof obj === 'object' && obj !== null ? obj.id : obj;
      
      const response = await http.get(`/${table}/${id}`);
      return response.data;
    } catch (e) {
      console.error(`Error fetching ${table} item:`, e);
      return { error: e.message };
    }
  },
  
  addItem: async (table, obj) => {    
    try {
      const response = await http.post(`/${table}`, obj);
      return response.data;
    } catch (e) {
      console.error(`Error adding ${table} item:`, e);
      return { error: e.message };
    }
  },
  
  updateItem: async (table, obj) => {
    try {
      const response = await http.put(`/${table}/${obj.id}`, obj);
      return response.data;
    } catch (e) {
      console.error(`Error updating ${table} item:`, e);
      return { error: e.message };
    }
  },
  
  deleteItem: async (table, obj) => {
    try {
      // Handle both object with id and direct id parameter
      const id = typeof obj === 'object' && obj !== null ? obj.id : obj;
      
      const response = await http.delete(`/${table}/${id}`);
      return { success: true, data: response.data };
    } catch (e) {
      console.error(`Error deleting ${table} item:`, e);
      return { error: e.message };
    }
  },
};

export default GlobalServices;
