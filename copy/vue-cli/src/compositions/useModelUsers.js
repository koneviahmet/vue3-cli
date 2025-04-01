import { ref, reactive, computed, toRefs } from "vue";
import UsersServices from "../services/UsersServices";
import store from "../store/index.js";

export default function () {
  const loading = ref(false);
  const data = ref([]);
  const error = ref(null);

  /* get all users */
  const getItems = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.getItems()
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.value = [...response];
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

  const searchItems = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.searchItems(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.value = [...response];
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
  const getItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.getItem(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.value = { ...response };
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

  const loginItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.loginItem(obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            // data.value = { ...response };
            resolve({ ...response[0] });
            store.commit("setUser", response[0]);
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
  const addItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      const extraData = {
        token: Math.floor(Math.random() * 10),
        role: 2,
      };

      await UsersServices.addItem({ ...obj, ...extraData })
        .then((response) => {
          loading.value = false;


          if (response && !response?.error) {
            data.value = [...data.value, response];
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

  const updateItem = async (id, obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.updateItem(id, obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            //data.value = [...response]
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

  const deleteItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.deleteItem(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            data.value = [...data.value.filter((i) => i.id != obj.id)];
            resolve([...data.value.filter((i) => i.id != obj.id)]);
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
    error,
    loading,
    data,
    getItem,
    searchItems,
    getItems,
    addItem,
    updateItem,
    deleteItem,
    loginItem,
  };
}
