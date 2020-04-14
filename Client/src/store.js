import Vue from "vue";
import Vuex from "vuex";
import chunk from "lodash/chunk";
import login from "./components/modalLogin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    im_detail_list: [],
    list: [],
    pageNum: 0,
    isScroll: true,
    onlineUserList: new Map(),
    userInfo: {}, // 当前用户
    user_socketId: '', // 当前连接socketid
  },
  mutations: {
    updateSocketId(state, socketId) {
      state.user_socketId = socketId;
    },
    clearMsg(state) {
      state.im_detail_list = [];
      state.list = [];
      state.pageNum = 0;
      state.isScroll = true;
    },
    async getOnlineList(state, data) {
      const onlineUserList = new Map();
      const keys = Object.keys(data);
      for (const item of keys) {
        const user = JSON.parse(data[item]);
        const msgList = await localforage.getItem(user.email);
        user.lastmsg = (msgList && msgList[msgList.length - 1].msg) || '';
        onlineUserList.set(item,user)
      }
      state.onlineUserList = onlineUserList;
      const userInfo = await localforage.getItem('userInfo');
      state.userInfo = userInfo;
    },
    setCurrentUser(state, userInfo) {
      state.userInfo = userInfo;
    },
    handleNewUserLine(state, data) {
      state.onlineUserList.set(data.socketId,data);
    },
    handleNewUserOffline(state, socketId) {
      state.onlineUserList.delete(socketId);
    },
    async addImMsg(state, data) {
      state.isScroll = true;
      state.list.push(data);
      const key = data.formRoomId === state.user_socketId ? data.toRoomId : data.formRoomId;
      const friend = state.onlineUserList.get(key);
      console.log(key, friend, state.onlineUserList);
      friend.lastmsg = data.msg;
      state.onlineUserList.set(key, friend);
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
      const user = await localforage.getItem('userInfo');
      const email = data.toAddress === user.email ? data.formAddress : data.toAddress;
      let im_detail_list = await localforage.getItem(email);
      if (im_detail_list && Array.isArray(im_detail_list)) {
        im_detail_list.push(data);
      } else {
        im_detail_list = [data];
      }
      localforage.setItem(email, im_detail_list);
    },
    handleImList(ctx, list) {
      const im_list = chunk(list, 15);
      ctx.commit("upDateIm_detail_list", {
        im_list,
        pageNum: im_list.length - 1
      });
    },
    async handleLogin(ctx, socket) {
      const userInfo = await localforage.getItem('userInfo');
      if(!userInfo) {
        login();
      } else {
        const {_id, nickName, headerImg, email} = userInfo;
        ctx.commit('setCurrentUser', userInfo);
        socket.emit('user online list', {_id, nickName, headerImg, email})
      }
    }
  }
});
