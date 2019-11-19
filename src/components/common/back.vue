<template>
  <el-button type="primary" icon="el-icon-arrow-left" plain class="back" @click="back()">返回</el-button>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {
      back(){
          this.$router.go(-1)
      }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';
.back{
    margin-bottom 20px
    padding-left 10px
    padding-right 15px
    margin-left 40px
}
</style>