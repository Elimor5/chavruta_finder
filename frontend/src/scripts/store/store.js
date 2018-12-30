import Vue from 'vue'
import Vuex from 'vuex'

import loader from './modules/loader';
import toastr from './modules/toastr';
import identity from './modules/identity';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loader,
        toastr,
        identity
    }
})
