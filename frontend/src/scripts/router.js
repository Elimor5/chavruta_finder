import Vue from "vue";
import Router from "vue-router";

import axios from 'axios';
import baseUrl from "../api/baseUrl";

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
          component: Login
      }
  ]
});

router.beforeEach(async (to, from, next ) => {
    const response = await axios({
    method: 'GET',
    url: `${baseUrl}/topics`,
    });
    next();
});

export default router