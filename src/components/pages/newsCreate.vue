<template>
  <div class="create_wrap">
    <v-back v-if="isAdmin<=1"></v-back>
    <el-form label-width="80px">
      <el-form-item label="题目">
        <el-input v-model="user.tit" :disabled="isAdmin>1"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="user.con"
          :disabled="isAdmin>1"
        ></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="user.time" type="date" placeholder="选择日期" :disabled="isAdmin>1"></el-date-picker>
      </el-form-item>
    </el-form>
    <el-row class="btn">
      <el-button type="primary" @click="update()" v-if="isAdmin<=1">添加</el-button>
      <el-button type="primary" @click="revise()" v-if="isAdmin<=1">修改</el-button>
      <el-button type="primary" @click="back()" v-if="isAdmin>1">返回</el-button>
    </el-row>
  </div>
</template>
<script>
import api from "../../common/api";
export default {
  props: [],
  components: {},
  data() {
    return {
      id: "",
      user: {
        tit: "",
        con: "",
        time: ""
      },
      isupdate: false,
      isAdmin:''
    };
  },
  methods: {
    update() {
      // var spac=/\s+/g;
      if (this.user.tit == "" || this.user.con == "") {
        this.$message({
          showClose: true,
          message: "请输入题目或内容",
          type: "warning"
        });
        return;
      }
      this.$http({
        url: api.addNews,
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
          this.$router.replace("/index/news");
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
      delete this.user._id;
      this.$http({
        url: api.updateNews,
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
          this.$router.replace("/index/news");
          return;
        }
        this.$message({
          showClose: true,
          message: d.data.info,
          type: "warning"
        });
      });
    },
    back() {
      this.$router.go(-1);
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.isAdmin=localStorage.getItem("isAdmin")
    this.id = this.$route.query.id;
    if (this.id == "create") {
      //新建
      this.isupdate = false;
    } else {
      //修改
      this.isupdate = true;
      this.$http({
        url: api.findNews,
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