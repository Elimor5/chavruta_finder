import Vue from "vue";
import Router from "vue-router";

import store from "./store/store";

import StatusCall from './startup/statusCall';

import Home from "../components/pages/home/Home.vue";
import Login from '../components/pages/auth/login/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
      {
          path: "/",
          name: "Home",
          component: Home
      },
      {
          path: "/auth/login",
          name: "Log In",
          component: Login,
          beforeEnter(to, from, next) {
              if (store.state.identity.isAuthenticated) {
                  next({path: '/'});
              }
              else {
                  next();
              }
          }
      }
  ]
});

router.beforeEach(async (to, from, next ) => {
    await StatusCall();

    next();
});

export default router