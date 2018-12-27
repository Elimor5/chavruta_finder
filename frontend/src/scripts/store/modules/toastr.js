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
        toast(context, messageContent) {
            context.commit('setMessage', messageContent.toString());
            context.commit('toggle', true);

            setTimeout(() => {
                context.commit('toggle', false);
                context.commit('setMessage', null);
            }, 5000);
        }
    }
}