import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/index';
import '@/plugins/axios';
import '@/plugins/vuetify';
import 'jsoneditor/dist/jsoneditor.css';
import '@/assets/stylus/app.styl';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
