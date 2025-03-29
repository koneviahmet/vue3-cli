const defaultPath = "admin";
const defaultPathName =
  defaultPath.charAt(0).toUpperCase() + defaultPath.slice(1);

export const adminRouters = [
  {
    path: `/${defaultPath}`,
    component: () => import(`../../views/${defaultPath}/Layout.vue`),
    children: [
      {
        name: `${defaultPathName}Home`,
        path: "",
        component: () => import(`../../views/${defaultPath}/Dashboard.vue`),
      },
      {
        name: `${defaultPathName}Settings`,
        path: "settings",
        component: () => import(`../../views/${defaultPath}/Settings.vue`),
      },
      {
        name: `${defaultPathName}SiteSettings`,
        path: "site-settings",
        component: () => import(`../../views/${defaultPath}/SiteSettings.vue`),
      },
      {
        name: `${defaultPathName}Users`,
        path: "users",
        component: () => import(`../../views/${defaultPath}/Users.vue`),
      },
      {
        name: `${defaultPathName}Analytics`,
        path: "analytics",
        component: () => import(`../../views/${defaultPath}/Analytics.vue`),
      },
      {
        name: `${defaultPathName}Logs`,
        path: "logs",
        component: () => import(`../../views/${defaultPath}/Logs.vue`),
      },
      {
        name: `${defaultPathName}Schema`,
        path: "schema",
        component: () => import(`../../views/schema/Home.vue`),
      },
      {
        name: `${defaultPathName}SchemaCreate`,
        path: "schema/create",
        component: () => import(`../../views/schema/Create.vue`),
      },
      {
        name: `${defaultPathName}SchemaUpdate`,
        path: "schema/update/:id",
        component: () => import(`../../views/schema/Update.vue`),
      },
      {
        name: `${defaultPathName}SchemaDetail`,
        path: "schema/detail/:id",
        component: () => import(`../../views/schema/Detail.vue`),
      },
      {
        name: `${defaultPathName}Contacts`,
        path: "contacts",
        component: () => import(`../../views/contacts/Home.vue`),
      },
    ]
  },
]; 