const roles = [
  { role: 1, description: "quest" },
  { role: 2, description: "user" },
  { role: 3, description: "admin" },
];

const roleArr = {
  notAuth: [1],
  isAuth: [1, 2, 3],
};

/* role pages */
const rolePageArr = {
  HomePage: [1, 2, 3],
  ErrorPage: [1, 2, 3],
  Error404: [1, 2, 3],
  TosPage: [1, 2, 3],
  PrivacyPage: [1, 2, 3],
  CookiePolicyPage: [1, 2, 3],
  ContactPage: [1, 2, 3],
  UserHome: [1, 2, 3],
  UserSignIn: [1, 2, 3],
  UserUpdate: [1, 2, 3],
  UserDetail: [1, 2, 3],
  UserList: [1, 2, 3],
  UserSearch: [1, 2, 3],
  UserLogin: [1, 2, 3],
  UserForgotPassword: [1, 2, 3],
  SchemaHome: [1, 2, 3],
  SchemaCreate: [1, 2, 3],
  SchemaUpdate: [1, 2, 3],
  SchemaDetail: [1, 2, 3],
  SchemaList: [1, 2, 3],
  SchemaSearch: [1, 2, 3],
  ContactsHome: [1, 2, 3],
  ContactsCreate: [1, 2, 3], 
  ContactsUpdate: [1, 2, 3], 
  ContactsDetail: [1, 2, 3], 
  ContactsList: [1, 2, 3], 
  ContactsSearch: [1, 2, 3], 
  TasksHome: [1, 2, 3],
  TasksCreate: [1, 2, 3],
  TasksUpdate: [1, 2, 3],
  TasksDetail: [1, 2, 3],
  TasksList: [1, 2, 3],
  TasksSearch: [1, 2, 3],
  KanbanBoard: [1, 2, 3],
  CalendarView: [1, 2, 3],
  // Admin pages
  AdminHome: [1, 2, 3],
  AdminSettings: [1, 2, 3],
  AdminSiteSettings: [1, 2, 3],
  AdminUsers: [1, 2, 3],
  AdminAnalytics: [1, 2, 3],
  AdminLogs: [1, 2, 3],
  AdminSchema: [1, 2, 3],
  AdminSchemaCreate: [1, 2, 3],
  AdminSchemaUpdate: [1, 2, 3],
  AdminSchemaDetail: [1, 2, 3],
  AdminContacts: [1, 2, 3],
  empty: [],
};

export default { ...roleArr, ...rolePageArr };
export { roles };
