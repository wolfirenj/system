<template>
  <div class="create_wrap">
    <v-back></v-back>
    <el-form label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="user.name" :disabled="isupdate" @blur.prevent="offname()"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.pass" show-password :disabled="isupdate" @blur.prevent="offpass()"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if="!isupdate">
        <el-input v-model="confirm" show-password></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="user.tel" @blur.prevent="offtel()"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" @blur.prevent="offemail()"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="user.sex" label="男" :disabled="isupdate">男</el-radio>
        <el-radio v-model="user.sex" label="女" :disabled="isupdate">女</el-radio>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="user.idx" :disabled="isupdate" @blur="offidx()"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="user.des" @blur="offdes()"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
    </el-form>
    <el-row class="btn">
      <el-button type="primary" @click="update()" v-if="!isupdate">添加</el-button>
      <el-button type="primary" @click="revise()" v-if="isupdate">修改</el-button>
    </el-row>
  </div>
</template>
<script>
import api from "../../common/api";
var spa=/^\s+$/;
export default {
  props: [],
  components: {},
  data() {
    return {
      id: "",
      user: {
        name: "",
        pass: "",
        des: "",
        time: "",
        tel: "",
        email: "",
        sex: "",
        idx: ""
      },
      confirm: "",
      isupdate: false
    };
  },
  methods: {
    update() {
      if (this.confirm != this.user.pass) {
        this.$message({
          showClose: true,
          message: "两次密码输入不一致",
          type: "warning"
        });
        return;
      }
      this.$http({
        url: api.addUser,
        method: "get",
        params: this.user
      }).then(d => {
        // console.log(d);
        if (d.data.code == -1) {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
          this.$router.replace("/login");
          return;
        }
        if (d.data.isok) {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/index/user");
          return;
        }
        this.$message({
          showClose: true,
          message: d.data.info,
          type: "warning"
        });
      });
    },
    revise() {
      console.log(this.user);
      delete this.user._id;
      this.$http({
        url: api.updateUser,
        method: "get",
        params: this.user
      }).then(d => {
        console.log(d);
        if (d.data.code == -1) {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
          this.$router.replace("/login");
          return;
        }
        if (d.data.isok) {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/index/user");
          return;
        }
        this.$message({
          showClose: true,
          message: d.data.info,
          type: "warning"
        });
      });
    },
    offtel() {
      var tel = /^[1]([3-9])[0-9]{9}$/;
      if (!tel.test(this.user.tel)) {
        this.$message({
          showClose: true,
          message: "请输入正确的手机号",
          type: "warning"
        });
      }
    },
    offname() {
      var acName = /^[0-9|a-z|A-Z]{6,9}$/;
      if (!acName.test(this.user.name)) {
        this.$message({
          showClose: true,
          message: "用户名长度为6-9位且不能为空",
          type: "warning"
        });
      }
    },
    offpass() {
      var psd = /^[0-9a-zA-Z]{6,9}$/;
      if (!psd.test(this.user.pass)) {
        this.$message({
          showClose: true,
          message: "密码长度为6-9位且不能为空，包含大小写字母和数字",
          type: "warning"
        });
      }
    },
    offdes() {
      if (this.user.des.length==0) {
        this.$message({
          showClose: true,
          message: "属性不能为空",
          type: "warning"
        });
      }
    },
    offemail(){
      var mail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(!mail.test(this.user.email)){
        this.$message({
          showClose: true,
          message: "请输入正确的邮箱地址",
          type: "warning"
        });
      }
    },
    offidx(){
      var idx=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if(!idx.test(this.user.idx)){
        this.$message({
          showClose: true,
          message: "请输入正确的身份证号",
          type: "warning"
        });
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.id = this.$route.query.id;
    if (this.id == "create") {
      //新建
      this.isupdate = false;
    } else {
      //修改
      this.isupdate = true;
      this.$http({
        url: api.findUser,
        method: "get",
        params: {
          id: this.id
        }
      }).then(d => {
        // console.log(d);
        this.user = d.data.data[0];
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.create_wrap {
  .btn {
    text-align: center;
  }

  p {
    line-height: 20px;
    color: red;
    display: none;
  }

  div {
    span {
      display: inline-block;
    }

    .input {
      display: inline-block;
      width: 70%;
    }
  }
}
</style>