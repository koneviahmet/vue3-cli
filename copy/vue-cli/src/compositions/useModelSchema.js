import { ref, reactive, computed, toRefs } from "vue";
import SchemaServices from "../services/SchemaServices";

export default function () {
  const loading = ref(false);
  const data = reactive({ list: [] });
  const error = ref(null);

  const setLoading = () => (loading.value = !loading.value);

  const getItems = async () => {
    return new Promise(async (resolve, reject) => {
      await SchemaServices.getItems()
        .then((response) => {
          setLoading();
          data.list = [...response];
          resolve([...response]);
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const searchItems = async (obj) => {
    return new Promise(async (resolve, reject) => {
      await SchemaServices.searchItems(obj)
        .then((response) => {
          setLoading();
          data.list = [...response];
          resolve([...response]);
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const getItem = async (obj) => {
    return new Promise(async (resolve, reject) => {
      await SchemaServices.getItem(obj)
        .then((response) => {
          setLoading();
          data.list = { ...response };
          resolve({ ...response });
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  // add new user
  const addItem = async (obj) => {
    return new Promise(async (resolve, reject) => {
      const extraData = {
        extra: "extra info",
      };

      await SchemaServices.addItem({ ...obj, ...extraData })
        .then((response) => {
          setLoading();
          data.list = [...data.list, response];
          resolve({ ...response });
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const updateItem = async (id, obj) => {
    return new Promise(async (resolve, reject) => {
      await SchemaServices.updateItem(id, obj)
        .then((response) => {
          setLoading();
          //data.list = [...response]
          resolve({ ...response });
        })
        .catch((error) => {
          setLoading();
          error.value = error;
          reject(error);
        });
    });
  };

  const deleteItem = async (obj) => {
    return new Promise(async (resolve, reject) => {
      await SchemaServices.deleteItem(obj)
        .then((response) => {
          setLoading();
          data.list = [...data.list.filter((i) => i.id != obj.id)];
          resolve([...data.list.filter((i) => i.id != obj.id)]);
        })
        .catch((error) => {
          setLoading();
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
