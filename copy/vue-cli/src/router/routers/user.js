const defaultPath = "user";
const defaultPathName =
  defaultPath.charAt(0).toUpperCase() + defaultPath.slice(1);

export const userRouters = [
  {
    name: `${defaultPathName}Home`,
    path: `/${defaultPath}`,
    component: () => import(`../../views/${defaultPath}/Home.vue`),
  },
  {
    name: `${defaultPathName}SignIn`,
    path: `/${defaultPath}/signIn`,
    component: () => import(`../../views/${defaultPath}/SignIn.vue`),
  },
  {
    name: `${defaultPathName}Update`,
    path: `/${defaultPath}/update/:id`,
    component: () => import(`../../views/${defaultPath}/Update.vue`),
  },
  {
    name: `${defaultPathName}Detail`,
    path: `/${defaultPath}/detail/:id`,
    component: () => import(`../../views/${defaultPath}/Detail.vue`),
  },
  {
    name: `${defaultPathName}List`,
    path: `/${defaultPath}/list`,
    component: () => import(`../../views/${defaultPath}/List.vue`),
  },
  {
    name: `${defaultPathName}Search`,
    path: `/${defaultPath}/search`,
    component: () => import(`../../views/${defaultPath}/Search.vue`),
  },
  {
    name: `${defaultPathName}Login`,
    path: `/${defaultPath}/login`,
    component: () => import(`../../views/${defaultPath}/Login.vue`),
  },
];
