import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SinglePost from "@/views/SinglePost.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/single-post/:id",
      name: "single-post",
      component: SinglePost,
    },
  ],
});

export default router;
