<template>
  <div class="main_wrap">
      <v-left></v-left>
      <v-right></v-right>
  </div>
</template>
<script>
import vLeft from './left'
import vRight from './right'
export default {
  props: [],
  components: {
      vLeft,
      vRight
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
.main_wrap{
    flex 1
    display flex
}
</style>