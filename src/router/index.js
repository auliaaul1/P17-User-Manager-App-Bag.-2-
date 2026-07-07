import { createRouter, createWebHistory } from "vue-router";
import UserList from "../views/UserList.vue";
import AddUser from "../views/AddUser.vue";

const routes = [
  { path: "/", component: UserList },
  { path: "/add", component: AddUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
