export const infoRouters = [
  {
    name: "TosPage",
    path: "/tos",
    component: () => import("../../views/info/Tos.vue"),
  },
  {
    name: "PrivacyPage",
    path: "/privacy",
    component: () => import("../../views/info/Privacy.vue"),
  },
  {
    name: "ContactPage",
    path: "/contact",
    component: () => import("../../views/info/Contact.vue"),
  },
  {
    name: "CookiePolicyPage",
    path: "/cookie-policy",
    component: () => import("../../views/info/CookiePolicy.vue"),
  },
  {
    name: "DockerInfo",
    path: "/docker",
    component: () => import("../../views/info/Docker.vue"),
  },
];
