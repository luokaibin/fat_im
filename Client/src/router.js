import Vue from "vue";
import Router from "vue-router";
import detail from "./views/detail.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      component: ()=> import('./views/list'),
    },
    {
      path: "/detail",
      name: "detail",
      component: detail
    },

  ]
});
