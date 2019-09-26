import Vue from "vue";
import Vuex from "vuex";
import chunk from "lodash/chunk";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    im_detail_list: [],
    list: [],
    pageNum: 0,
    isScroll: true
  },
  mutations: {
    addImMsg(state, data) {
      state.isScroll = true;
      state.list.push(data);
    },
    upDateIm_detail_list(state, { im_list, pageNum }) {
      state.im_detail_list = im_list;
      state.pageNum = pageNum;
      state.isScroll = true;
      state.list.unshift(...im_list[pageNum]);
    },
    handleUpdataList(state) {
      const pageNum = state.pageNum - 1;
      state.pageNum = pageNum;
      state.isScroll = false;
      state.list.unshift(...state.im_detail_list[pageNum]);
    }
  },
  actions: {
    async listen_new_msg(ctx, data) {
      ctx.commit("addImMsg", data);
      let im_detail_list = await localforage.getItem("im_detail_list");
      if (im_detail_list && Array.isArray(im_detail_list)) {
        im_detail_list.push(data);
      } else {
        im_detail_list = [data];
      }
      localforage.setItem("im_detail_list", im_detail_list);
    },
    handleImList(ctx, list) {
      const im_list = chunk(list, 15);
      ctx.commit("upDateIm_detail_list", {
        im_list,
        pageNum: im_list.length - 1
      });
    }
  }
});
