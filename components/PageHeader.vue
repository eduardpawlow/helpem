<template lang="pug">
  header
    button.back-btn(v-if="!hideBackBtn" @click="goBack")
      svg-icon(name="backicon.svg" width=28 height=28 fill="#3F8AE0")
    .page-header
      slot(name="page-header")
    .submenu
      slot(name="submenu")


</template>

<script>
export default {
  props: {
    hideBackBtn: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.06);

  .back-btn,
  .submenu {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
  }

  .page-header {
    flex: 1;
  }
}
</style>
