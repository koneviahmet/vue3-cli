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
  UserHome: [1, 2, 3],
  UserSignIn: [1, 2, 3],
  UserUpdate: [1, 2, 3],
  UserDetail: [1, 2, 3],
  UserList: [1, 2, 3],
  UserSearch: [1, 2, 3],
  UserLogin: [1, 2, 3],
  SchemaHome: [1, 2, 3],
  SchemaCreate: [1, 2, 3],
  SchemaUpdate: [1, 2, 3],
  SchemaDetail: [1, 2, 3],
  SchemaList: [1, 2, 3],
  SchemaSearch: [1, 2, 3],
  empty: [],
};

export default { ...roleArr, ...rolePageArr };
export { roles };
