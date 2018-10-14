// import '@babel/polyfill';
import Vue from 'vue';
import './filters';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// 使用cdn icon font
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
