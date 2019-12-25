import Vue from 'vue';
import App from '../App.vue';
import router from './router';
import store from './store/store';

// import 'onsenui/css/onsenui.css';
// import 'onsenui/css/onsen-css-components.css';
// import VueOnsen from 'vue-onsenui';

import Vuelidate from 'vuelidate';

import {
    directive as onClickaway
} from 'vue-clickaway';

import FormGroup from '../components/shared/forms/form-group/FormGroup.vue';

Vue.config.productionTip = false

Vue.component('cf-formgroup', FormGroup);

document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById('app');

    // Vue.use(VueOnsen);
    Vue.use(Vuelidate);

    new Vue({
        router,
        store,
        render: h => h(App),
        beforeCreate() {
            Vue.prototype.$loader = {
                show: () => {
                    this.$store.commit('loader/toggle', true);
                },
                hide: () => {
                    this.$store.commit('loader/toggle', false);
                }
            };

            Vue.prototype.$toastr = {
                toast: (message) => {
                    this.$store.dispatch('toastr/toast', message);
                }
            }


            Vue.prototype.$validate = function (vuelidate) {
                vuelidate.$touch();

                if (vuelidate.$error) {
                    this.$nextTick(() => {
                        const firstError = document.querySelectorAll('.inputError')[0];

                        firstError.scrollIntoView({
                            behavior: 'smooth'
                        });
                    })
                }

                return vuelidate.$invalid ? false : true;
            }

            Vue.directive('onClickaway', onClickaway);
        }
    }).$mount(el)
});