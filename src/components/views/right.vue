<template>
  <div class="right_wrap">
    <h3>{{$route.name}}</h3>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.right_wrap {
  padding: 20px;
  flex: 1;
  // background: linear-gradient(to top right, #f6f5f0, #fefefd);
  h3 {
    margin-bottom: 20px;
  }
}
</style>