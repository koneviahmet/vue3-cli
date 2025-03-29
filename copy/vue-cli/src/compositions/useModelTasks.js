import { ref, reactive, watch, toRefs, computed } from "vue";
import TasksServices from "../services/TasksServices";
import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";

export default function () {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(false);

  watch(data, () => {
    store.commit("addTasks", [...data.list])
  })

  const getItems = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await TasksServices.getItems()
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
      await TasksServices.searchItems(obj)
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
      await TasksServices.getItem(obj)
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

  // add new task
  const addItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await TasksServices.addItem(obj)
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
      await TasksServices.updateItem(obj)
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
    return new Promise(async () => {
      Alert.showPrompt("Are you sure you want to delete?").then((res) => {
        if(!res.isConfirmed){
          notyfError("you gave up")
        } else {
          deleteItem(obj)
        }
      });
    })
  }

  const deleteItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await TasksServices.deleteItem(obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            notyfSuccess("Delete success")
            deleteStoreData(obj.id)
            resolve([...data.list.filter((i) => i.id != obj.id)]);
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
    data.list = [...getStoreData.value, item]
  } 

  const updateStoreData = (item) => {
    const index = getStoreData.value.map(i => i.id).indexOf(item.id);
    if (index !== -1) {
      const updatedList = [...getStoreData.value];
      updatedList[index] = item;
      data.list = updatedList;
    }
  }

  const deleteStoreData = (id) => {
    data.list = getStoreData.value.filter(i => i.id != id);
  }

  const getStoreData = computed(() => {
    return data.list;
  })

  return {
    loading,
    data: getStoreData,
    error,
    getItems,
    getItem,
    searchItems,
    addItem,
    updateItem,
    deleteItem,
    confirmDelete
  };
} 