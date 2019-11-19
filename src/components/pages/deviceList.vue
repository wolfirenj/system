<template>
  <div class="list_box">
    <el-button type="primary" plain class="create" @click="create('create')" v-if="hidden">新建</el-button>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="count" label="序号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="ip" label="ip">
        <template slot-scope="scope">{{scope.row.ip}}</template>
      </el-table-column>
      <el-table-column prop="door" label="机房">
        <template slot-scope="scope">{{scope.row.door}}</template>
      </el-table-column>
      <el-table-column prop="num" label="编号">
        <template slot-scope="scope">{{scope.row.num}}</template>
      </el-table-column>
      <el-table-column prop="width" label="带宽">
        <template slot-scope="scope">{{scope.row.width}}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{scope.row.status=='0'?'空闲':'已出售'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="create(scope.row.id)" v-if="isAdmin<=1">编辑</el-button>
          <el-button
            type="primary"
            v-if="isAdmin>1"
            @click="buy(scope.row.id,0)"
            :disabled="scope.row.status=='0'"
          >购买</el-button>
          <!-- <el-button size="mini" type="danger" @click="del()">删除</el-button> -->
          <v-del :id="scope.row.id" @del="del($event)" v-if="isAdmin<=1"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "../../common/api";
export default {
  props: [],
  components: {},
  data() {
    return {
      tableData: [],
      isAdmin: "",
      hidden: true
    };
  },
  methods: {
    create(id) {
      this.$router.push("/index/device/create?id=" + id);
    },
    init() {
      this.$http({
        url: api.baseUrl + "/updateDevice",
        method: "get"
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
          this.tableData = d.data.data;
        } else {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    buy(id, status) {
      this.$http({
        url: api.baseUrl + "/updateDevice",
        method: "get",
        params: {
          id: id,
          status: status
        }
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
          this.tableData = d.data.data;
          // this.init()
        } else {
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "warning"
          });
        }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin");
    if (this.isAdmin > 1) {
      this.hidden = false;
    }
    this.$http({
      url: api.findDevice,
      method: "get"
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
        this.tableData = d.data.data;
      } else {
        this.$message({
          showClose: true,
          message: d.data.info,
          type: "warning"
        });
      }
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.list_box {
  .create {
    margin-bottom: 20px;
  }
}
</style>