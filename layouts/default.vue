<template lang="pug">
  .page
    Header
    .page-content
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

  background: linear-gradient(180deg, #40c7da -3.56%, #514a9d 105.57%);

  .page-content {
    display: flex;
    flex: 1;
    height: 100%;
    padding-bottom: 100px;
  }
}

.container {
  width: 1280px;
  margin: 0 auto;
}
</style>
