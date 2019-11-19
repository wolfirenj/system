<template>
  <div class="header clearfix">
    <div class="left">欢迎进入后台管理系统</div>
    <div class="right">
      <img src="../../assets/img/login.jpg" class="right_img">
      <div class="right_name clearfix" @mouseenter="enter()" @mouseleave.self="leave()">
        <div class="name">{{account}}</div>
        <div class="login_out" v-show="seen" @click="out()">退出登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../common/api";
export default {
  props: [],
  components: {},
  data() {
    return {
      account:localStorage.getItem('account'),
      seen:false
    };
  },
  methods: {
    enter(){
      this.seen=true
    },
    leave(){
      this.seen=false;
    },
    out(){
      this.$http({
        url:api.exit,
        method:'get'
      }).then(d=>{
        if (d.data.code == -1) {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
          this.$router.replace("/login");
          return;
        }
        // console.log(d)
        if(d.data.isok){
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace('/login')
          return
        }
      })
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.header {
  height: 80px;
  background: #409EFF;
  border-bottom 1px solid #333
  .left {
    float: left;
    line-height 80px
    padding-left 20px
    color white
    font-size 30px
  }
  .right{
      float right
      width 200px
      .right_img{
          display block
          width 70px
          height 70px
          margin-top 5px
          border-radius 50%
          float left
      }
      .right_name{
          float right
          .name{
              height 80px
              width 100px
              text-align center
              word-wrap: break-word;
              word-break: normal;
              cursor pointer
          }
          .login_out{
              position fixed
              right 20px
              top 75px
              height 60px
              line-height 60px
              cursor pointer
          }
      }
  }
}
</style>