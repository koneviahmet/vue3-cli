import { ref, reactive, computed, toRefs } from "vue";
import Services from "../services/index";
import store from "../store/index.js";

const UsersServices = (await Services.UsersServices).default;

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
            store.commit("setUser", response);
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

  // add new user
  const addItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {

      await UsersServices.addItem({ ...obj })
        .then((response) => {
          loading.value = false;
          console.log(response);
          
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
            store.commit("setUser", response);
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


  const logOut = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await UsersServices.logOut()
        .then((response) => {
          loading.value = false;
          resolve(response);
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
    logOut
  };
}
