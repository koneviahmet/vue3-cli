import { ref, reactive, watch, toRefs, computed } from "vue";
import GlobalServices from "../services/pocketbase/GlobalServices.js";


import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";


export default function useContacts() {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(false);

  watch(data, () => {
    store.commit("addContacts", [...data.list])
  })

  const getItems = async () => {
    loading.value = true;
    error.value = false;
    
    return new Promise(async (resolve, reject) => {
      await GlobalServices.getItems("contacts")
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
              data.list = [...response];
              resolve([...response]); 
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "System error occurred";
              error.value = systemError;
              reject(systemError);
            }
          }
        })
        .catch((err) => {
          loading.value = false;
          error.value = err;
          reject(err);
        });
    });
  };

  const searchItems = async (obj) => {
    loading.value = true;
    error.value = false;
    
    return new Promise(async (resolve, reject) => {
      await GlobalServices.searchItems("contacts", obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            data.list = [...response];
            resolve([...response]); 
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "System error occurred";
              error.value = systemError;
              reject(systemError);
            }
          }
        })
        .catch((err) => {
          loading.value = false;
          error.value = err;
          reject(err);
        });
    });
  };

  const getItem = async (obj) => {
    loading.value = true;
    error.value = false;
    
    return new Promise(async (resolve, reject) => {
      await GlobalServices.getItem("contacts", obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            resolve({...response}); 
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "System error occurred";
              error.value = systemError;
              reject(systemError);
            }
          }
        })
        .catch((err) => {
          loading.value = false;
          error.value = err;
          reject(err);
        });
    });
  };

  const addItem = async (obj) => {
    loading.value = true;
    error.value = false;
    
    return new Promise(async (resolve, reject) => {
      await GlobalServices.addItem("contacts", obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            addStoreData(response);
            notyfSuccess("Contact added successfully");
            resolve({ ...response });
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "System error occurred";
              error.value = systemError;
              reject(systemError);
            }
          }
        })
        .catch((err) => {
          loading.value = false;
          error.value = err;
          reject(err);
        });
    });
  };

  const updateItem = async (obj) => {
    loading.value = true;
    error.value = false;
    
    return new Promise(async (resolve, reject) => {
      await GlobalServices.updateItem("contacts", obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            updateStoreData(response);
            notyfSuccess("Contact updated successfully");
            resolve({ ...response });
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "System error occurred";
              error.value = systemError;
              reject(systemError);
            }
          }
        })
        .catch((err) => {
          loading.value = false;
          error.value = err;
          reject(err);
        });
    });
  };

  const confirmDelete = (obj) => {
    return new Promise(async (resolve) => {
      Alert.showPrompt("Are you sure you want to delete this contact?").then((res) => {
        if(!res.isConfirmed){
          notyfError("Operation cancelled");
          resolve(false);
        } else {
          deleteItem(obj).then(() => {
            resolve(true);
          }).catch(() => {
            resolve(false);
          });
        }
      });
    });
  };

  const deleteItem = async (obj) => {
    loading.value = true;
    error.value = false;
   
    return new Promise(async (resolve, reject) => {
      await GlobalServices.deleteItem("contacts", obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            notyfSuccess("Contact deleted successfully");
            deleteStoreData(obj.id);
            resolve(true);
          } else {
            if(response?.error){
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "System error occurred";
              error.value = systemError;
              reject(systemError);
            }
          }
        })
        .catch((err) => {
          loading.value = false;
          error.value = err;
          reject(err);
        });
    });
  };

  const addStoreData = (item) => {
    data.list = [...getStoreData.value, item];
  };

  const updateStoreData = (item) => {
    const index = getStoreData.value.map(i => i.id).indexOf(item.id);
    if (index !== -1) {
      const updatedList = [...getStoreData.value];
      updatedList[index] = item;
      data.list = updatedList;
    }
  };

  const deleteStoreData = (id) => {
    data.list = data.list.filter(item => item.id !== id);
  };

  const getStoreData = computed(() => {
    return store.getters._getContacts;
  });

  return {
    loading,
    data,
    error,
    contactsLoading: loading,
    contactsData: data,
    contactsError: error,
    getItems,
    getItem,
    searchItems,
    addItem,
    updateItem,
    deleteItem,
    confirmDelete
  };
}
