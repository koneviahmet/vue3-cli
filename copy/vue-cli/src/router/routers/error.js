export const errorRouters = [
  {
    name: "ErrorPage",
    path: "/error",
    component: () => import("../../views/error/Error.vue"),
  },
  {
    name: "Error404",
    path: "/404",
    component: () => import("../../views/error/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../../views/error/404.vue"),
  },
];
