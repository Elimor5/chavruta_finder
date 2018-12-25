import Vue from "vue";
import Router from "vue-router";

import axios from 'axios';
import baseUrl from "../api/baseUrl";

import Home from "./components/pages/home/Home.vue";


Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
      {
          path: "/",
          name: "Home",
          component: Home
      }
  ]
});

router.beforeEach(async (to, from, next ) => {
    const response = await axios({
    method: 'GET',
    url: `${baseUrl}/api/topics`,
    });

    console.log(response);
    next();
});

export default router