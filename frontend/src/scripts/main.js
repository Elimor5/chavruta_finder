import Vue from 'vue'
import App from '../App.vue'
import router from './router'
import store from './store'

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';

import Vuelidate from 'vuelidate';

Vue.config.productionTip = false

document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById('app');

  Vue.use(VueOnsen);
  Vue.use(Vuelidate);

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(el)
});



