<template>
  <div class="im_list">
    <div class="header">
      消息
    </div>
    <div class="main">
      <listItem
        v-for="(value,key) in onlineUserList"
        :key="key"
        :listItem="value"
        @clickItem="handleChatDetail"
      />
    </div>
  </div>
</template>

<script>
import listItem from '@/components/listItem';
import { mapState, mapMutations } from "vuex";
export default {
  name: "list",
  components: {
    listItem
  },
  computed: {
    ...mapState({
      onlineUserList: state => {
        console.log(state.onlineUserList);
        return state.onlineUserList
      },
    })
  },
  data() {
    return {
    };
  },
  methods: {
    handleChatDetail(value) {
      this.$router.push({name: 'detail', query: {id: value}});
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
.im_list {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
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
.main {
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 0.3rem;
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
      }
    }
    .other {
      width: 3rem;
      padding: 0.2rem 0.5rem;
    }
  }
}
</style>
