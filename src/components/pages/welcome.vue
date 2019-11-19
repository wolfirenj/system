<template>
  <div>
    <h2>Welcome Back, {{account}}</h2>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      account:localStorage.getItem('account')
    };
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';
div{
  h2{
    text-align center
    font-size 40px
  }
}
</style>