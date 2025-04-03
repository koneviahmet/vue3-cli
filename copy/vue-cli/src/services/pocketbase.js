import PocketBase from 'pocketbase';
import store from "../store/index";

// Initialize PocketBase client with the URL from environment variables
const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';
const pb = new PocketBase(pocketBaseUrl);

// // Load auth data from localStorage
// const loadAuthFromStorage = () => {
//   try {
//     // PocketBase automatically loads from localStorage by default
//     // This function exists in case you want to add custom logic
    
//     // If auth is valid, update the store
//     if (pb.authStore.isValid) {
//       if (store.commit && typeof store.commit === 'function') {
//         store.commit('setUser', pb.authStore.model);
//       }
//     }
//   } catch (error) {
//     console.error("Failed to load auth from storage:", error);
//     // Clear any potentially corrupted auth data
//     pb.authStore.clear();
//   }
// };

// // Call this function when your app initializes
// loadAuthFromStorage();

// // Add auth state change listener
// pb.authStore.onChange(() => {
//   if (pb.authStore.isValid) {
//     // User is logged in, update the store
//     if (store.commit && typeof store.commit === 'function') {
//       store.commit('setUser', pb.authStore.model);
//     }
//   } else {
//     // User is logged out, clear the store
//     if (store.commit && typeof store.commit === 'function') {
//       store.commit('logoutUser');
//     }
//   }
// });

// Add an after request hook to handle token refresh
pb.beforeSend = function(url, options) {
  // You can modify the request options here
  // For example, add additional headers
  options.headers = options.headers || {};
  
  // You could add project-specific headers here
  // options.headers['X-Custom-Header'] = 'CustomValue';
  
  return { url, options };
};

// Add a custom method to the pb object
// pb.getImageUrl = function(collectionId, recordId, filename, queryParams = {}) {
//   // Build query string from params
//   const query = new URLSearchParams(queryParams).toString();
//   const queryStr = query ? `?${query}` : '';
  
//   return `${pocketBaseUrl}/api/files/${collectionId}/${recordId}/${filename}${queryStr}`;
// };

export default pb; 