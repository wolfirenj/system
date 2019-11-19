<template>
  <div class="list_box">
    <el-button type="primary" plain class="create" @click="create('create')" v-if="hidden">新建</el-button>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="num" label="序号">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="tit" label="题目">
        <template slot-scope="scope">{{scope.row.tit}}</template>
      </el-table-column>
      <el-table-column prop="time" label="注册时间">
        <template slot-scope="scope">{{scope.row.time.substr(0,10)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" v-if="isAdmin<=1" @click="create(scope.row.id)">编辑</el-button>
          <el-button size="mini" v-if="isAdmin>1" @click="create(scope.row.id)">查看</el-button>
          <!-- <el-button size="mini" type="danger" @click="del()">删除</el-button> -->
          <v-del :id="scope.row.id" @del="del($event)"  v-if="isAdmin<=1"></v-del>
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
      isAdmin:'',
      hidden:true
    };
  },
  methods: {
    create(id) {
      this.$router.push("/index/news/create?id=" + id);
    },
    init() {
      this.$http({
        url: api.findNews,
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
    },
    del(id) {
      this.$http({
        url: api.delNews,
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
    this.init(),
    this.isAdmin=localStorage.getItem('isAdmin')
    if(this.isAdmin>1){
      this.hidden=false
    }
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