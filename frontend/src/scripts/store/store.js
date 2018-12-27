import Vue from 'vue'
import Vuex from 'vuex'

import loader from './modules/loader.js';
import toastr from './modules/toastr.js';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loader,
        toastr
    }
})
