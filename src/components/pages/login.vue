<template>
  <div class="login_wrap">
    <img src="http://img2.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=214&gp=0.jpg" alt />
    <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form>-->
    <div class="login_box">
      <header>登录</header>
      <div class="user_pick">
        <el-select v-model="data.type" placeholder="请选择" class="pickbox">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="inp_box">
        <el-input v-model="data.name" placeholder="请输入账号" class="input"></el-input>
      </div>
      <div class="inp_box">
        <el-input placeholder="请输入密码" v-model="data.pass" show-password class="input"></el-input>
      </div>
      <div>
        <el-button type="primary" @click="login()">登录</el-button>
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
      data: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        },
        {
          value: "2",
          label: "用户"
        }
      ]
    };
  },
  methods: {
    login() {
      if(this.data.name==''||this.data.pass==''){
        this.$message({
          showClose: true,
          message: '亲，请输入账号或密码',
          type: 'warning'
        });
        return
      }
      this.$http({
        url: api.login,
        method: "post",
        data: this.data
      }).then(d => {
        console.log(d);
        if (d.data.isok) {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "success"
          });
          localStorage.setItem('account',this.data.name)
          localStorage.setItem('isAdmin',d.data.isAdmin)
          this.$router.replace('/index')
        }else{
          this.$message({
          showClose: true,
          message: d.data.info,
          type: 'warning'
        });
        }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.login_wrap {
  width: 100vw;
  height: 100vh;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }

  .login_box {
    background: white;
    width: 400px;
    height: 300px;
    position: fixed;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    text-align: center;
    border-radius: 10px;

    header {
      height: 50px;
      border-bottom: 1px solid #409EFF;
      line-height: 50px;
      text-align: center;
      font-size: 30px;
      color: #409EFF;
      margin-bottom: 10px;
    }

    .user_pick {
      line-height: 55px;
      text-align: center;

      .pickbox {
        width: 80%;
      }
    }

    .inp_box {
      line-height: 55px;

      .input {
        width: 80%;
      }
    }
  }
}
</style>