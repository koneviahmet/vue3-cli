import { ref, reactive, computed, toRefs } from "vue";
import SchemaServices from "../services/SchemaServices";

export default function () {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(false);



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
            data.list = {...response};
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
      const extraData = {
        extra: "extra info",
      };

      await SchemaServices.addItem({ ...obj, ...extraData })
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

  const updateItem = async (id, obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      obj.role = 2
      await SchemaServices.updateItem(id, obj)
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

  const deleteItem = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SchemaServices.deleteItem(obj)
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
    schemaError: error,
    schemaLoading: loading,
    schemaData: toRefs(data).list,
    getSchema: getItem,
    searchSchemas: searchItems,
    getSchemas: getItems,
    addSchema: addItem,
    updateSchema: updateItem,
    deleteSchema: deleteItem,
  };
}
