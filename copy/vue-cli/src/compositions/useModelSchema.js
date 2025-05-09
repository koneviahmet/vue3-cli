import { ref, reactive, watch, toRefs, computed } from "vue";
import GlobalServices from "../services/pocketbase/GlobalServices.js";
// import GlobalServices from "../services/json-services/GlobalServices.js";


import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";

export default function () {
  const loading = ref(false);
  const data = ref([]);
  const error = ref(false);

  watch(data, (newData) => {            
    if (newData?.items && newData?.items?.length > 0) store.commit("addSchema", [...newData.items])    
  })

  const user = computed(() => {
    return store.getters?._getCurrentUser || null;
  });

  const getItems = async (obj = {}) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.getItems('schema', obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
              data.value =  response?.items || [...response];
              resolve(response); 
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
            data.value =  response?.items || [...response];
            resolve(response); 
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

  const getItem = async (obj, options = {}) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.getItem('schema', obj, options)
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

      await GlobalServices.addItem('schema', { ...obj, createdBy: user?.value?.id || null })
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

      await GlobalServices.updateItem('schema', { ...obj, createdBy: user?.value?.id || null })
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
    return new Promise(async (resolve, reject) => {
      Alert.showPrompt("Are you sure you want to delete?").then((res) => {
        if(!res.isConfirmed){
          notyfError("you gave up")
        }else{
          deleteItem(obj)
            .then(res => resolve(res))
            .catch(err => reject(err))
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
    deleteItem,
  };
}
