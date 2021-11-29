import { ref, reactive, computed, toRefs } from "vue";
import UsersServices from "../services/UsersServices";
import store from "../store/index.js";

export default function () {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(null);

  const setLoading = () => (loading.value = !loading.value);

  /* get all users */
  const getUsers = async () => {
    return new Promise(async (resolve, reject) => {
      await UsersServices.getUsers()
        .then((response) => {
          setLoading();
          data.list = [...response];
          resolve([...response]);
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const searchUsers = async (obj) => {
    return new Promise(async (resolve, reject) => {
      await UsersServices.searchUsers(obj)
        .then((response) => {
          setLoading();
          data.list = [...response];
          resolve([...response]);
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  // get user with id
  const getUser = async (obj) => {
    return new Promise(async (resolve, reject) => {
      await UsersServices.getUser(obj)
        .then((response) => {
          setLoading();
          data.list = { ...response };
          resolve({ ...response });
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const loginUser = async (obj) => {
    return new Promise(async (resolve, reject) => {
      await UsersServices.getUser(obj)
        .then((response) => {
          setLoading();
          data.list = { ...response };
          resolve({ ...response });
          store.commit("setUser", response);
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  // add new user
  const addUser = async (obj) => {
    return new Promise(async (resolve, reject) => {
      const extraData = {
        token: Math.floor(Math.random() * 10),
        role: 2,
      };

      await UsersServices.addUser({ ...obj, ...extraData })
        .then((response) => {
          setLoading();
          data.list = [...data.list, response];
          resolve({ ...response });
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const updateUser = async (id, obj) => {
    return new Promise(async (resolve, reject) => {
      await UsersServices.updateUser(id, obj)
        .then((response) => {
          setLoading();
          //data.list = [...response]
          resolve({ ...response });
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const deleteUser = async (obj) => {
    return new Promise(async (resolve, reject) => {
      await UsersServices.deleteUser(obj)
        .then((response) => {
          setLoading();
          data.list = [...data.list.filter((i) => i.id != obj.id)];
          resolve([...data.list.filter((i) => i.id != obj.id)]);
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  return {
    usersError: error,
    usersLoading: loading,
    usersData: toRefs(data).list,
    getUser,
    searchUsers,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    loginUser,
  };
}
