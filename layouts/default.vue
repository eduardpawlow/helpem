<template lang="pug">
  .page
    .page-content
      nuxt
    Navigation(v-if="!this.$store.state.hiddenNav")
</template>

<script>
import Navigation from '~/components/Navigation'
export default {
  components: {
    Navigation,
  },
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
  max-width: 450px;

  .page-content {
    display: flex;
    flex: 1;
    height: 100%;
  }
}
</style>
