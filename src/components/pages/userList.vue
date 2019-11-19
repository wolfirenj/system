<template>
  <div class="list_box">
    <el-button type="primary" plain class="create" @click="create('create')">新建</el-button>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="date" label="序号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="账号">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column prop="tel" label="电话">
        <template slot-scope="scope">{{scope.row.tel}}</template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
        <template slot-scope="scope">{{scope.row.email}}</template>
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">{{scope.row.sex}}</template>
      </el-table-column>
      <el-table-column prop="idx" label="身份证号">
        <template slot-scope="scope">{{scope.row.idx}}</template>
      </el-table-column>
      <el-table-column prop="des" label="备注">
        <template slot-scope="scope">{{scope.row.des}}</template>
      </el-table-column>
      <el-table-column prop="time" label="时间">
        <template slot-scope="scope">{{scope.row.time.substr(0,10)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="create(scope.row.id)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="del()">删除</el-button> -->
          <v-del :id="scope.row.id" @del="del($event)"></v-del>
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
      tableData: []
    };
  },
  methods: {
    create(id) {
      this.$router.push("/index/user/create?id=" + id);
    },
    init() {
      this.$http({
        url: api.findUser,
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
            console.log(d)
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
    del(id) {
      this.$http({
        url: api.delUser,
        method: "get",
        params: {
          id: id
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
          this.$message({
            showClose: true,
            message: d.data.info,
            type: "success"
          });
          this.init()
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
    this.init()
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