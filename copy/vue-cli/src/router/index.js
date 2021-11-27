import { createRouter, createWebHashHistory } from "vue-router";
import roles  from  "../utils/roles"
import store from '../store/index.js'

import { homeRouters } from "./routers/home.js"
import { userRouters } from "./routers/user.js"
import { schemaRouters } from "./routers/schema.js"
import { errorRouters } from "./routers/error.js"
//import

const router = createRouter({ 
    routes: [
        ...homeRouters,
        ...userRouters,
        ...schemaRouters,
        ...errorRouters
    ],

    // use url #
    history: createWebHashHistory() 

})



router.beforeEach((to, from, next) => {
    const role  = store.getters._getCurrentRole || 1;
    if (!roles[to.name]) {
        next({ name: "Error404" });
    }else{
        if(roles[to.name].includes(role)){
            next();
        }else{
            next({ name: "ErrorPage" });
        }
    }

    
    //next({ name: "LoginPage" });
    //next(false) //home page route
    
})


export default router;