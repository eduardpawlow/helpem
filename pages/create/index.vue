<template lang="pug">
  div
</template>

<script>
import PageHeader from '~/components/PageHeader'
export default {
  components: { PageHeader },
  middleware: ({ redirect }) => {
    redirect('/chats')
  },
}
</script>

<style lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
