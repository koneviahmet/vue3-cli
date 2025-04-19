import MermaidHome from "../../views/mermaid/Home.vue";
import MermaidCreate from "../../views/mermaid/Create.vue";
import MermaidUpdate from "../../views/mermaid/Update.vue";
import MermaidDetail from "../../views/mermaid/Detail.vue";
import MermaidList from "../../views/mermaid/List.vue";
import MermaidSearch from "../../views/mermaid/Search.vue";

export const mermaidRouters = [
  {
    path: "/mermaid",
    name: "MermaidHome",
    component: MermaidHome,
  },
  {
    path: "/mermaid/create",
    name: "MermaidCreate",
    component: MermaidCreate,
  },
  {
    path: "/mermaid/update/:id",
    name: "MermaidUpdate",
    component: MermaidUpdate,
  },
  {
    path: "/mermaid/detail/:id",
    name: "MermaidDetail",
    component: MermaidDetail,
  },
  {
    path: "/mermaid/list",
    name: "MermaidList",
    component: MermaidList,
  },
  {
    path: "/mermaid/search",
    name: "MermaidSearch",
    component: MermaidSearch,
  },
]; 