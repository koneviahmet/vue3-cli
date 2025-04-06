import { ref, reactive } from "vue";
import Services from "../services/index.js";
import { notyfError, notyfSuccess } from "../utils/notyf.js";

const SiteSettingsServices = (await Services.SiteSettingsServices).default;

export default function () {
  const loading = ref(false);
  const data = reactive({ settings: {} });
  const analyticsData = reactive({ analytics: {} });
  const logsData = reactive({ logs: [] });
  const systemStatusData = reactive({ status: {} });
  const error = ref(false);

  const getSettings = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SiteSettingsServices.getSettings()
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            data.settings = { ...response };
            resolve({ ...response });
          } else {
            if (response?.error) {
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              error.value = systemError;
              reject(systemError);
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

  const updateSettings = async (obj) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SiteSettingsServices.updateSettings(obj)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            data.settings = { ...response };
            notyfSuccess("Settings updated successfully");
            resolve({ ...response });
          } else {
            if (response?.error) {
              error.value = response.error;
              notyfError(response.error);
              reject(response.error);
            } else {
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              error.value = systemError;
              notyfError(systemError);
              reject(systemError);
            }
          }
        })
        .catch((error) => {
          loading.value = false;
          error.value = error;
          notyfError(error);
          reject(error);
        });
    });
  };

  const getAnalytics = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SiteSettingsServices.getAnalytics()
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            analyticsData.analytics = { ...response };
            resolve({ ...response });
          } else {
            if (response?.error) {
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              error.value = systemError;
              reject(systemError);
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

  const getLogs = async (page = 1, limit = 20) => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SiteSettingsServices.getLogs(page, limit)
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            logsData.logs = [...response];
            resolve([...response]);
          } else {
            if (response?.error) {
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              error.value = systemError;
              reject(systemError);
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

  const getSystemStatus = async () => {
    loading.value = true;
    return new Promise(async (resolve, reject) => {
      await SiteSettingsServices.getSystemStatus()
        .then((response) => {
          loading.value = false;
          if (response && !response?.error) {
            systemStatusData.status = { ...response };
            resolve({ ...response });
          } else {
            if (response?.error) {
              error.value = response.error;
              reject(response.error);
            } else {
              const systemError = "Sistemden kaynaklanan bir hata oldu";
              error.value = systemError;
              reject(systemError);
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
    loading,
    error,
    settings: data.settings,
    analytics: analyticsData.analytics,
    logs: logsData.logs,
    systemStatus: systemStatusData.status,
    getSettings,
    updateSettings,
    getAnalytics,
    getLogs,
    getSystemStatus
  };
} 