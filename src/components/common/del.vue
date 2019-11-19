<template>
  <el-button size="mini" type="danger" @click="del()">删除</el-button>
</template>
<script>
export default {
  props: ["id"],
  components: {},
  data() {
    return {};
  },
  methods: {
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$emit('del',this.id)
      });
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl'
</style>