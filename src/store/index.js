import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

Vue.use({
    install(Vue, options) {
        Vue.prototype.$store = new Vuex.Store({
            state,
            actions,
            mutations
        })
    }
})