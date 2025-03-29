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
