<template>
  <div class="sys_wrap">
      <v-header></v-header>
      <v-main></v-main>
  </div>
</template>
<script>
import vHeader from '../views/header'
import vMain from '../views/main'
export default {
  props: [],
  components: {
      vHeader,
      vMain
  },
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl'
.sys_wrap{
    display flex
    flex-direction column
    height 100vh
}
</style>