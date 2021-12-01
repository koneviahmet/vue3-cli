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
];
