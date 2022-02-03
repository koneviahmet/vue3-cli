import { ref, reactive, watch, toRefs, computed } from "vue";
import SchemaServices from "../services/SchemaServices";
import store from "../store/index.js";
import Alert from "../utils/alert.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";

export default function () {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(false);

  watch(data, () => {
    store.commit("addSchema", [...data.list])
    //console.log("changed",store.getters._getSchema);
  })

  const getItems = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SchemaServices.getItems()
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




  const searchItems = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SchemaServices.searchItems(obj)
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

  const getItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SchemaServices.getItem(obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            //data.list = {...response};
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

      await SchemaServices.addItem(obj)
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

      await SchemaServices.updateItem(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            //data.list = [...response]
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
      await SchemaServices.deleteItem(obj)
        .then((response) => {
          loading.value = false;

          if (response && !response?.error) {
            notyfSuccess("Delete success")
            deleteStoreData(obj.id)
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

  
  const addStoreData = (item) => {
    data.list = [...getStoreData.value, item]
  } 


  const updateStoreData = (item) => {
    const index = getStoreData.value.map(i => i.id).indexOf(item.id);
    getStoreData.value[index] = item;
    data.list = getStoreData.value;
  }

  const deleteStoreData = (id) => {
    data.list = [...getStoreData.value.filter((i) => i.id != id)];
  }

  const getStoreData = computed(() => {
    return store.getters._getSchema;
  })

  return {
    schemaError: error,
    schemaLoading: loading,
    //schemaData: toRefs(data).list,
    schemaData: getStoreData,
    getSchema: getItem,
    searchSchemas: searchItems,
    getSchemas: getItems,
    addSchema: addItem,
    updateSchema: updateItem,
    deleteSchema: confirmDelete,
  };
}
