import Vue from "vue";
import socket_io from "socket_io";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
import "./registerServiceWorker";
import "./assets/reset.css";

Vue.config.productionTip = false;
// const socket = socket_io('https://dev.server.jindll.com');
const socket = socket_io("http://192.168.2.100:3939");
socket.on("service msg", msg => {
  store.dispatch("listen_new_msg", msg);
});
if (localStorage.im_detail_list) {
  const im_detail_list = JSON.parse(localStorage.im_detail_list);
  store.commit("upDateIm_detail_list", im_detail_list);
}
Vue.use(iView);
Vue.prototype.$socket = socket;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
