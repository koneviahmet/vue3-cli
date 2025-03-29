const defaultPath = "kanban";
const defaultPathName =
  defaultPath.charAt(0).toUpperCase() + defaultPath.slice(1);

export const kanbanRouters = [
  {
    name: `${defaultPathName}Board`,
    path: `/${defaultPath}`,
    component: () => import(`../../views/${defaultPath}/Board.vue`),
  },
]; 