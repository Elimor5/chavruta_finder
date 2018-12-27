import Vue from 'vue';
import App from '../App.vue';
import FormGroup from '../components/shared/forms/form-group/FormGroup.vue';
import router from './router';
import store from './store';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';

import Vuelidate from 'vuelidate';

Vue.config.productionTip = false

Vue.component('cf-formgroup', FormGroup);

document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById('app');

  Vue.use(VueOnsen);
  Vue.use(Vuelidate);

  new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.isLoading = false;
    }
  }).$mount(el)
});



