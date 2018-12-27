export default {
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
}