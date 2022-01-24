import { ref, reactive, computed, toRefs } from "vue";
import UsersServices from "../services/UsersServices";
import store from "../store/index.js";

export default function () {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(null);

  /* get all users */
  const getUsers = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.getUsers()
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.list = [...response];
            resolve([...response]);
          }else{
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            }else{
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              if (response?.error){
                error.value = response.error;
                reject(response.error);
              }
              
              error.value = systemError;
              reject(systemError)
            }
          }

        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          reject(error);
        });
    });
  };

  const searchUsers = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.searchUsers(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.list = [...response];
            resolve([...response]);
          }else{
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            }else{
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              if (response?.error){
                error.value = response.error;
                reject(response.error);
              }
              
              error.value = systemError;
              reject(systemError)
            }
          }


        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          reject(error);
        });
    });
  };

  // get user with id
  const getUser = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.getUser(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.list = { ...response };
            resolve({ ...response });
          }else{
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            }else{
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              if (response?.error){
                error.value = response.error;
                reject(response.error);
              }
              
              error.value = systemError;
              reject(systemError)
            }
          }

        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          reject(error);
        });
    });
  };

  const loginUser = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.getUser(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.list = { ...response };
            resolve({ ...response });
            store.commit("setUser", response);
          }else{
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            }else{
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              if (response?.error){
                error.value = response.error;
                reject(response.error);
              }
              
              error.value = systemError;
              reject(systemError)
            }
          }

        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          reject(error);
        });
    });
  };

  // add new user
  const addUser = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      const extraData = {
        token: Math.floor(Math.random() * 10),
        role: 2,
      };

      await UsersServices.addUser({ ...obj, ...extraData })
        .then((response) => {
          loading.value = false;


          if (response && !response?.error) {
            data.list = [...data.list, response];
            resolve({ ...response });
          }else{
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            }else{
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              if (response?.error){
                error.value = response.error;
                reject(response.error);
              }
              
              error.value = systemError;
              reject(systemError)
            }
          }

        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          reject(error);
        });
    });
  };

  const updateUser = async (id, obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.updateUser(id, obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            //data.list = [...response]
            resolve({ ...response });
          }else{
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            }else{
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              if (response?.error){
                error.value = response.error;
                reject(response.error);
              }
              
              error.value = systemError;
              reject(systemError)
            }
          }

        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          reject(error);
        });
    });
  };

  const deleteUser = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.deleteUser(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.list = [...data.list.filter((i) => i.id != obj.id)];
            resolve([...data.list.filter((i) => i.id != obj.id)]);
          }else{
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            }else{
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              if (response?.error){
                error.value = response.error;
                reject(response.error);
              }
              
              error.value = systemError;
              reject(systemError)
            }
          }

        })
        .catch((error) => {
          loading.value = false;
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
