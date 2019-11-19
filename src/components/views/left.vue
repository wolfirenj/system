<template>
  <div class="left_nav">
      <router-link to='/index/manage' class="manage" active-class="select" v-if="isAdmin==0">管理员管理</router-link>
      <router-link to='/index/user' class="manage" active-class="select" v-if="isAdmin!=2">用户管理</router-link>
      <router-link to='/index/news' class="manage" active-class="select">通知</router-link>
      <router-link to='/index/device' class="manage" active-class="select">设备管理</router-link>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      isAdmin:''
    };
  },
  methods: {},
  watch: {},
  computed: {},
  mounted(){
    this.isAdmin=localStorage.getItem('isAdmin')
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl'
.left_nav{
    width 200px
    // height 100vh
    background #409EFF
    padding-top 20px
    .manage{
        display block
        line-height 40px
        text-align center
        color white
        &:hover{
            background #909399
        }
    }
    .select{
        background #909399
    }
}
</style>