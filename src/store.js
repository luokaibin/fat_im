import Vue from "vue";
import Vuex from "vuex";
import db from "./config/db";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    im_detail_list: []
  },
  mutations: {
    addImMsg(state, data) {
      state.im_detail_list.push(data);
    },
    upDateIm_detail_list(state, data) {
      state.im_detail_list = data;
    }
  },
  actions: {
    async listen_new_msg(ctx, data) {
      ctx.commit("addImMsg", data);
      await db.imlist.add({
        name: data.name,
        msg: data.msg,
        sendTime: data.sendTime
      });
      // let im_detail_list = [];
      // if (localStorage.im_detail_list) {
      //   im_detail_list = JSON.parse(localStorage.im_detail_list);
      // }
      // im_detail_list.push(data);
      // localStorage.setItem("im_detail_list", JSON.stringify(im_detail_list));
    }
  }
});
