import http from "./http";

const SiteSettingsServices = {
  getSettings: async () => {
    try {
      const response = await http.get("/settings");
      return response?.data;
    } catch (e) {}
  },
  updateSettings: async (obj) => {
    try {
      const response = await http.put("/settings", obj);
      return response?.data;
    } catch (e) {}
  },
  getAnalytics: async () => {
    try {
      const response = await http.get("/analytics");
      return response?.data;
    } catch (e) {}
  },
  getLogs: async (page = 1, limit = 20) => {
    try {
      const response = await http.get(`/logs?_page=${page}&_limit=${limit}`);
      return response?.data;
    } catch (e) {}
  },
  getSystemStatus: async () => {
    try {
      const response = await http.get("/system-status");
      return response?.data;
    } catch (e) {}
  }
};

export default SiteSettingsServices; 