<template>
  <div class="im_container">
    <div class="header">
      {{this.touser.nickName}}
    </div>
    <div class="content_list" ref="content_list">
      <p class="more" @click="handleUpdataList" v-if="pageNum > 0">
        加载更多内容
      </p>
      <div class="li" v-for="(item, index) of list" :key="index">
        <div :class="{ user: true, blue: item.formAddress === userInfo.email }">
          {{item.formName}}
        </div>
        <div class="content">{{ item.msg }}</div>
      </div>
    </div>
    <div class="footer">
      <textarea
        class="input"
        type="text"
        v-model="msg_content"
        placeholder="请输入消息内容"
      ></textarea>
      <button class="send_button" @click="handleMsgSend">发送</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "home",
  components: {},
  computed: {
    ...mapState({
      list: state => state.list,
      pageNum: state => state.pageNum,
      isScroll: state => state.isScroll,
      userInfo: state => state.userInfo,
    }),
    disabled() {
      return !this.name;
    },
    touser() {
      const touser = this.$store.state.onlineUserList.get(this.id);
      return touser;
    }
  },
  data() {
    const {id} = this.$route.query;
    return {
      id,
      msg_content: "",
      name: "李四",
      hasName: true,
    };
  },
  methods: {
    ...mapMutations(["handleUpdataList"]),
    handleMsgSend() {
      this.$socket.emit("client msg",[this.$socket.id,this.id], {
        formAddress: this.userInfo.email,
        formName: this.userInfo.nickName,
        formHeaderImg: this.userInfo.headerImg,
        formRoomId: this.$socket.id,
        toRoomId: this.id,
        toAddress: this.touser.email,
        toUserName: this.touser.nickName,
        toUserHeaderImg: this.touser.headerImg,
        msg: this.msg_content
      });
      this.msg_content = "";
    },
    handleSetName() {
      localforage.setItem("name", this.name);
      this.hasName = false;
    }
  },
  async created() {
    try {
      const im_detail_list = await localforage.getItem(this.touser.email);
      if (im_detail_list && Array.isArray(im_detail_list)) {
        this.$store.dispatch("handleImList", im_detail_list);
      }
      document.title = this.touser.nickName;
    } catch (error) {
      throw error;
    }
  },
  mounted() {
    const list = this.$refs.content_list;
    list.scrollTop = list.scrollHeight;
  },
  updated() {
    if (this.isScroll) {
      const list = this.$refs.content_list;
      list.scrollTop = list.scrollHeight;
    }
  },
  destroyed() {
    this.$store.commit('clearMsg');
  }
};
</script>

<style lang="less" scoped>
.im_container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  height: 2.5rem;
  background-color: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
}
.content_list {
  flex: 1;
  overflow-y: auto;
  .more {
    color: #409eff;
    box-sizing: border-box;
    padding: 0.5rem;
    cursor: pointer;
  }
  .li {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    div {
      justify-content: flex-start;
      padding: 0.3rem 0.4rem;
    }
    .user {
      color: plum;
    }
    .blue {
      color: #409eff;
    }
    .content {
      padding: 0.15rem 1.3rem;
      text-align: left;
    }
  }
}
.footer {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.35rem;
  background-color: #e8e8e8;
  box-sizing: border-box;
}
.input {
  flex: 0.95;
  border-radius: 0.4rem;
  outline: none;
  border: 0;
}
.send_button {
  height: 100%;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  background-color: #67c23a;
}
</style>
