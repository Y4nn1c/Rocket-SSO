import Vue from "vue";
import App from "./App.vue";
import GSignInButton from "vue-google-signin-button";
Vue.config.productionTip = false;
Vue.use(GSignInButton);
new Vue({
  render: h => h(App)
}).$mount("#app");
