<template lang="pug">
  .home-page  
    PageHeader(hideBackBtn)
      template(v-slot:page-header)
        .page-header-title Авторизация

</template>

<script>
import PageHeader from '~/components/PageHeader'
export default {
  components: { PageHeader },
  middleware: ({ redirect }) => {
    redirect('/tasks')
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
