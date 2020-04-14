<template>
  <div class="li" @click="handleChatDetail">
    <img class="header" :src="user.headerImg" alt="" srcset="">
    <div class="main_centent">
      <p class="name">{{user.nickName}}</p>
      <p class="message">{{user.lastmsg || '暂无新消息'}}</p>
    </div>
    <div class="other">
      <time>21:31</time>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    listItem: Array,
  },
  computed: {
    user() {
      return this.listItem[1];
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleChatDetail() {
      console.log(this.user.socketId);
      this.$emit('clickItem', this.user.socketId);
    }
  },
  async created() {
  },
  mounted() {
  },
  updated() {
  }
};
</script>

<style lang="less" scoped>
.li {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  padding: 0.25rem 0;
  height: 4rem;
  box-sizing: border-box;
  .header {
    height: 3.5rem;
    width: 3.5rem;
    border: none;
    border-radius: 0.6rem;
    outline: none;
  }
  .main_centent {
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0.2rem 0.5rem;
    .name {
      font-size: 0.9rem;
    }
    .message {
      font-size: 0.7rem;
      width: 11rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }
  }
  .other {
    width: 3rem;
    padding: 0.2rem 0.5rem;
  }
}
</style>
