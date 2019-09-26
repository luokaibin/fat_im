import Vue from "vue";
import socket_io from "socket_io";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
// import db from "./config/db";
// import localforage from "localforage";
import "./registerServiceWorker";
import "./assets/reset.css";

localforage.config({
  name: "IM",
  version: "1.0.0",
  description: "本地数据储存数据库"
});

Vue.config.productionTip = false;
const socket = socket_io("https://dev.server.jindll.com");
// const socket = socket_io("http://192.168.2.100:3939");
socket.on("service msg", msg => {
  store.dispatch("listen_new_msg", msg);
});
Vue.use(iView);
Vue.prototype.$socket = socket;
// Vue.prototype.$db = db;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
