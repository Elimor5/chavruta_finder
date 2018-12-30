import store from '../store/store';

export default async function() {
    store.commit('loader/toggle', true);

    try {
        await store.dispatch('identity/fetchIdentity');
    }
    catch(e) {
        store.dispatch('toastr/toast', e);
    }

    store.commit('loader/toggle', false);
}