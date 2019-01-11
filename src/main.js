import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './plugins/vuetify';
import './stylus/main.styl';
import 'jsoneditor/dist/jsoneditor.css';
import './assets/css/app.styl';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
