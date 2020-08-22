<template lang="pug">
  .page
    Header(
      transparent
      absolute
     )
    .page-content.white
      nuxt
</template>

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header,
  },
  created() {
    if (localStorage.getItem('isAuthorized')) {
      this.$store.commit('SET_AUTHORIZE_USER', true)
    } else {
      this.$store.commit('SET_AUTHORIZE_USER', false)
    }
  },
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;

  .page-content {
    display: flex;
    flex: 1;
    height: 100%;

    &.white {
      background-color: #fff;
      padding-bottom: 0px;
    }
  }
}

.container {
  width: 1280px;
  margin: 0 auto;
}
</style>
