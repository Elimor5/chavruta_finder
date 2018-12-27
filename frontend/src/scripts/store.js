import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loader: {
            strict: true,
            namespaced: true,
            state: {
                isLoading: false
            },
            mutations: {
                toggle(state, loadState) {
                    state.isLoading = loadState;
                }
            }
        },
    }
})
