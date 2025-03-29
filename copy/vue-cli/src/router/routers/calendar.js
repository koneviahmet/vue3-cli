const defaultPath = "calendar";
const defaultPathName =
  defaultPath.charAt(0).toUpperCase() + defaultPath.slice(1);

export const calendarRouters = [
  {
    name: `${defaultPathName}View`,
    path: `/${defaultPath}`,
    component: () => import(`../../views/${defaultPath}/Calendar.vue`),
  },
]; 