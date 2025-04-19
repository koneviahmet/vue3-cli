import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null,
    saltKey: "haydaHobbaGizliKey!456?",
    schema: [], 
    contacts: [],
    tasks: [],
    mermaid: []
  },
  mutations: {
    setUser(state, user) {
      console.log("user :>> ", user);
      state.user = user;
    },
    logoutUser(state) {
      state.user = null;
    },
    addContacts(state, contacts) { 
      state.contacts = [...contacts]; 
    }, 
    addSchema(state, schema) {
      state.schema = [...schema];
    },
    addTasks(state, tasks) {
      state.tasks = [...tasks];
    },
    addMermaid(state, mermaid) {
      state.mermaid = [...mermaid];
    },
    addMermaidItem(state, item) {
      state.mermaid.push(item);
    },
    updateMermaidItem(state, updatedItem) {
      const index = state.mermaid.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        state.mermaid.splice(index, 1, updatedItem);
      }
    },
    deleteMermaidItem(state, id) {
      state.mermaid = state.mermaid.filter(item => item.id !== id);
    }
  },
  getters: {
    _isAuthenticated: (state) => state.user !== null,
    _getCurrentUser(state) {
      const user = state.user;

      delete user?.password;
      return user;
    },
    _currentUserId: (state) => state?.user?.id,
    _getCurrentRole: (state) => parseInt(state?.user?.role),
    _saltKey: (state) => state.saltKey,
    _getContacts: (state) => state?.contacts, 
    _getSchema: (state) => state?.schema,
    _getTasks: (state) => state?.tasks,
    _getMermaid: (state) => state?.mermaid,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
