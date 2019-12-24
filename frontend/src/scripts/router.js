import Vue from "vue";
import Router from "vue-router";

import store from "./store/store";

import StatusCall from './startup/statusCall';

import Home from "../components/pages/home/Home.vue";

import Login from '../components/pages/auth/login/Login.vue';
import Signup from '../components/pages/auth/signup/Signup.vue';

import FindChavruta from '../components/pages/chavruta/find/FindChavruta.vue';
import CreateChavruta from '../components/pages/chavruta/create/CreateChavruta.vue';
import ShowChavruta from '../components/pages/chavruta/show/ShowChavruta.vue'
import EditChavruta from '../components/pages/chavruta/edit/EditChavruta.vue'

import Dashboard from '../components/pages/dashboard/Dashboard.vue'

Vue.use(Router);

function authGuard(to, from, next) {
    if (!store.state.identity.isAuthenticated) {
        next({
            path: '/'
        });
    } else {
        next();
    }
}

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
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
                next({
                    path: '/'
                });
            } else {
                next();
            }
        }
    },
    {
        path: "/auth/signup",
        name: "Sign Up",
        component: Signup,
        beforeEnter(to, from, next) {
            if (store.state.identity.isAuthenticated) {
                next({
                    path: '/'
                });
            } else {
                next();
            }
        }
    },
    {
        path: "/auth/edit",
        name: "Edit Account",
        component: Signup,
        beforeEnter: authGuard,
        props: {
            IsEditMode: true
        }
    },
    {
        path: "/chavruta/find",
        name: "Find Chavruta",
        component: FindChavruta
    },
    {
        path: "/chavruta/create",
        name: "New Chavruta",
        component: CreateChavruta
    },
    {
        path: "/chavruta/:id",
        name: 'Show Chavruta',
        component: ShowChavruta
    }, {
        path: "/chavruta/edit/:id",
        component: EditChavruta
    }, {
        path: "/dashboard",
        beforeEnter: authGuard,
        name: 'Dashboard',
        component: Dashboard
    }]
});

router.beforeEach(async (to, from, next) => {
    document.title = "Chavruta Finder"
    window.scrollTo(0, 0)

    await StatusCall();

    next();
});

export default router