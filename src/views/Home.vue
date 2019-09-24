<template>
  <div class="im_container">
    <div class="header">群聊</div>
    <div class="content_list" ref="content_list">
      <div class="li" v-for="(item, index) of list" :key="index">
        <div :class="{ user: true, blue: item.name === name }">
          {{ item.name }}
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
    <Modal v-model="hasName" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <span>请先输入你的马甲</span>
      </p>
      <div style="text-align:center">
        <Input v-model="name" placeholder="请输入你的昵称" />
      </div>
      <div slot="footer">
        <Button
          type="primary"
          :disabled="disabled"
          size="large"
          @click="handleSetName"
          >确认</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home",
  components: {},
  computed: {
    ...mapState({
      list: state => state.im_detail_list
    }),
    disabled() {
      return !this.name;
    }
  },
  data() {
    return {
      msg_content: "",
      name: "李四",
      hasName: true
    };
  },
  methods: {
    handleMsgSend() {
      this.$socket.emit("client msg", {
        name: this.name,
        msg: this.msg_content
      });
      this.msg_content = "";
    },
    handleSetName() {
      localStorage.setItem("name", this.name);
      this.hasName = false;
    }
  },
  // created() {
  //   if (localStorage.name) {
  //     this.name = localStorage.name;
  //     this.hasName = false;
  //   } else {
  //     this.hasName = true;
  //   }
  // },
  async created() {
    try {
      // const res = await this.$db.table('imlist').reverse().limit(3).toArray();
      const res = await this.$db.imlist
        .where("sendTime")
        .reverse()
        .limit(3)
        .toArray();
      this.data = res;
    } catch (error) {
      throw error;
    }
  },
  mounted() {
    const list = this.$refs.content_list;
    list.scrollTop = list.scrollHeight;
  },
  updated() {
    const list = this.$refs.content_list;
    list.scrollTop = list.scrollHeight;
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
