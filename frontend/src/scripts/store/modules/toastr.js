export default {
    strict: true,
    namespaced: true,
    state: {
        isVisible: false,
        message: null
    },
    mutations: {
        toggle(state, visibleState) {
            state.isVisible = visibleState;
        },
        setMessage(state, messageConent) {
            state.message = messageConent;
        }
    },
    actions: {
        toast(context, error) {
            const errorMessage = (error.response && error.response.data.error) || error.toString();

            context.commit('setMessage', errorMessage);
            context.commit('toggle', true);

            setTimeout(() => {
                context.commit('toggle', false);
                context.commit('setMessage', null);
            }, 5000);
        }
    }
}