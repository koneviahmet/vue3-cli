import { createRouter, createWebHistory } from "vue-router";
import roles from "../utils/roles";
import store from "../store/index.js";

import { homeRouters } from "./routers/home.js";
import { infoRouters } from "./routers/info.js";
import { userRouters } from "./routers/user.js";
import { schemaRouters } from "./routers/schema.js";
import { errorRouters } from "./routers/error.js";
import { contactsRouters } from "./routers/contacts.js"
import { adminRouters } from "./routers/admin.js"
import { tasksRouters } from "./routers/tasks.js"
import { kanbanRouters } from "./routers/kanban.js"
import { calendarRouters } from "./routers/calendar.js"
//import

const router = createRouter({ 
    routes: [
        ...homeRouters,
        ...contactsRouters,
        ...infoRouters,
        ...userRouters,
        ...schemaRouters,
        ...adminRouters,
        ...tasksRouters,
        ...kanbanRouters,
        ...calendarRouters,
        ...errorRouters
    ],

    // use url #
    //history: createWebHashHistory() 
    history: createWebHistory()

})

router.beforeEach((to, from, next) => {
  const role = store.getters._getCurrentRole || 1;
  const isAuth = store.getters._isAuthenticated || false;

  if(isAuth && to.name == "HomePage"){
    next({ name: "UserHome" });
  }else{
    if (!roles[to.name]) {
      next({ name: "Error404" });
    } else {
      if (roles[to.name].includes(role)) {
        next();
      } else {
        next({ name: "ErrorPage" });
      }
    }
  }



  //next({ name: "LoginPage" });
  //next(false) //home page route
});

export default router;
