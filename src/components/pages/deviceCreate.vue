<template>
  <div class="create_wrap">
    <v-back></v-back>
    <el-form label-width="80px">
      <el-form-item label="ip">
        <el-input v-model="device.ip" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="机房">
        <el-input v-model="device.door"></el-input>
      </el-form-item>
      <el-form-item label="编号" v-if="!isupdate">
        <el-input v-model="device.num"></el-input>
      </el-form-item>
      <el-form-item label="带宽">
        <el-input v-model="device.width"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="device.status" label="空闲">空闲</el-radio>
        <el-radio v-model="device.status" label="已出售">已出售</el-radio>
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
export default {
  props: [],
  components: {},
  data() {
    return {
      device: {
        ip: "",
        door: "",
        width: "",
        num: "",
        status: ""
      },
      isupdate: false
    };
  },
  methods: {
    // handleEdit(ind,row){
    //   console.log(ind),
    //   console.log(row)
    // },
    update() {
      if (this.device.ip == "") {
        this.$message({
          showClose: true,
          message: "请输入题目或内容",
          type: "warning"
        });
        return;
      }
      this.$http({
        url: api.addDevice,
        method: "get",
        params: this.device
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
            showClose: true,
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/index/device");
        } else {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    revise() {
      delete this.user._id;
      this.$http({
        url: api.updateDevice,
        method: "get",
        params: this.device
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
          this.$router.replace("/index/device");
          return;
        }
        this.$message({
          showClose: true,
          message: d.data.info,
          type: "warning"
        });
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.id = this.$route.query.id;
    if (this.id == "create") {
      this.isupdate = false;
    } else {
      this.isupdate = true;
      this.$http({
        url: api.findDevice,
        method: "get",
        params: {
          id: this.id
        }
      }).then(d => {
          console.log(d)
        this.device = d.data.data[0];
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