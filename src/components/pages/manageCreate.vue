<template>
  <div class="create_wrap">
    <v-back></v-back>
    <el-form label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="user.name" :disabled="isupdate" @blur="offname()"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input v-model="user.pass" show-password :disabled="isupdate" @blur="offpass()"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if="!isupdate">
        <el-input v-model="confirm" show-password></el-input>
      </el-form-item>
      <el-form-item label="属性">
        <el-input v-model="user.prop" @blur="offprop()"></el-input>
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
// var spa=/\s/g;
export default {
  props: [],
  components: {},
  data() {
    return {
      id: "",
      user: {
        name: "",
        pass: "",
        prop: "",
        time: ""
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
        url: api.addManage,
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
          this.$router.replace("/index/manage");
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
        url: api.updateManage,
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
          this.$router.replace("/index/manage");
          return;
        }
        this.$message({
          showClose: true,
          message: d.data.info,
          type: "warning"
        });
      });
    },
    offname(){
      var acName=/^[0-9|a-z|A-Z]{6,9}$/
      if(!acName.test(this.user.name)){
        this.$message({
          showClose: true,
          message: "用户名长度为6-9位且不能为空",
          type: "warning"
        });
      }
    },
    offpass(){
      var psd=/^[0-9a-zA-Z]{6,9}$/
      if(!psd.test(this.user.pass)){
        this.$message({
          showClose: true,
          message: "密码长度为6-9位且不能为空，包含大小写字母和数字",
          type: "warning"
        });
      }
    },
    offprop(){
      if(this.user.prop.length==0){
        this.$message({
          showClose: true,
          message: "属性不能为空",
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
        url: api.findManage,
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

  // p {
  //   line-height: 20px;
  //   color: red;
  //   display: none;
  // }
}
</style>