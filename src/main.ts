import Vue from 'vue';
import Vuex from 'vuex';
import App from '@/App.vue';
import QuestionStoreDefinition from '@/model/QuestionStore';

Vue.use(Vuex);

new Vue({
    render(h) {
        return h(App, { props: this.$data });
    },
    data: {},
    store: new Vuex.Store(QuestionStoreDefinition),
}).$mount('#app');
