import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home-page/index.vue"),
  },
  {
    path: "/add-customer",
    name: "AddCustomer",
    component: () => import("../views/add-customer/index.vue"),
  },
  {
    path: "/more-info",
    name: "MoreInfo",
    component: () => import("../views/more-info/index.vue"),
  },
  {
    path: "/good-bye",
    name: "GoodBye",
    component: () => import("../views/good-bye/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
