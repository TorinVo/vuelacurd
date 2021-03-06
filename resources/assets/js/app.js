
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

Vue.config.devtools = true;
Vue.config.performance = true;

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('my-component', require('./components/MyComponent.vue'));
Vue.component('conditional-rendering', require('./components/ConditionalRendering.vue'));
Vue.component('list-rendering', require('./components/ListRendering.vue'));
Vue.component('user-dashboard', require('./components/UserDashboard.vue'));
Vue.component('api-calling', require('./components/ApiCalling.vue'));
//import App from './components/App.vue';

const app = new Vue({
  el: '#app',
  // components: {
  //   App
  // },
  // render: h => h(App)
});
