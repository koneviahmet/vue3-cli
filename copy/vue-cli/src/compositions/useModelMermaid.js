import { ref, reactive, watch, toRefs, computed } from "vue";
import GlobalServices from "../services/pocketbase/GlobalServices.js";

import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";


export default function () {
  const loading = ref(false);
  const data = ref([]);
  const error = ref(false);

  watch(data, () => {
    store.commit("addMermaid", [...data.value])
  })

  const user = computed(() => {
    return store.getters?._getCurrentUser || null;
  });

  const getItems = async (obj = {}) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.getItems('mermaid', obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
              data.value =  response?.items || [...response];
              resolve(response); 
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
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
      await GlobalServices.searchItems('mermaid', obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            data.value = [...response];
            resolve([...response]); 
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
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
      await GlobalServices.getItem('mermaid', obj, options)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            resolve({...response}); 
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
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

  const addItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.addItem('mermaid', { ...obj, createdBy: user?.value?.id || null })
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            addStoreData(response)
            resolve({ ...response });
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
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
      await GlobalServices.updateItem('mermaid', { ...obj, createdBy: user?.value?.id || null })
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            updateStoreData(response)
            resolve({ ...response });
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
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
    return new Promise((resolve, reject) => {
      Alert.Delete().then(() => {
        deleteItem(obj).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }).catch(() => {
        reject(false)
      })
    })
  }

  const deleteItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await GlobalServices.deleteItem('mermaid', obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            deleteStoreData(obj.id)
            resolve({ ...response });
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
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
    store.commit("addMermaidItem", item);
  }

  const updateStoreData = (item) => {
    store.commit("updateMermaidItem", item);
  }

  const deleteStoreData = (id) => {
    store.commit("deleteMermaidItem", id);
  }

  return {
    loading,
    data,
    error,
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    confirmDelete,
    searchItems
  };
} 