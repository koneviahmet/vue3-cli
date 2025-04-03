import { ref, reactive, watch, toRefs, computed } from "vue";
import Services from "../services/index";

import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";

const GlobalServices = (await Services.GlobalServices).default;

export default function () {
  const loading = ref(false);
  const data = ref([]);
  const error = ref(false);

  watch(data, () => {
    store.commit("addSchema", [...data.value])
    //console.log("changed",store.getters._getSchema);
  })

  const getItems = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.getItems('schema')
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
      await GlobalServices.searchItems('schema', obj)
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

  const getItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.getItem('schema', obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            //data = {...response};
            resolve({...response}); 
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

      await GlobalServices.addItem('schema', obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            addStoreData(response)
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

  const updateItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {

      await GlobalServices.updateItem('schema', obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            //data = [...response]
            updateStoreData(response)

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


  const confirmDelete = (obj) => {
    return new Promise(async () => {
      Alert.showPrompt("Are you sure you want to delete?").then((res) => {
        if(!res.isConfirmed){
          notyfError("you gave up")
        }else{
          deleteItem(obj)
        }
      });
    })
  }

  const deleteItem = async (obj) => {
   
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.deleteItem('schema', obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            notyfSuccess("Delete success")
            deleteStoreData(obj.id)
            resolve([...data.filter((i) => i.id != obj.id)]);
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

  
  const addStoreData = (item) => {
    data.value = [...getStoreData.value, item]
  } 


  const updateStoreData = (item) => {
    const index = getStoreData.value.map(i => i.id).indexOf(item.id);
    getStoreData.value[index] = item;
    data.value = getStoreData.value;
  }

  const deleteStoreData = (id) => {
    data.value = [...getStoreData.value.filter((i) => i.id != id)];
  }

  const getStoreData = computed(() => {
    return store.getters._getSchema;
  })

  return {
    error,
    loading,
    data,
    getStoreData,
    getItem,
    searchItems,
    getItems,
    addItem,
    updateItem,
    confirmDelete,
  };
}
