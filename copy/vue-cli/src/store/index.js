import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null,
    saltKey: "haydaHobbaGizliKey!456?",
    schema: [],
  },
  mutations: {
    setUser(state, user) {
      console.log("user :>> ", user);
      state.user = user;
    },
    logoutUser(state) {
      state.user = null;
    },
    addSchema(state, schema) {
      state.schema = [...schema];
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
    _getSchema: (state) => state?.schema,
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
