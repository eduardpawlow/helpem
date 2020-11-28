<template lang="pug">
  .profile-page  
    PageHeader
      template(v-slot:page-header)
        .page-header-title Профиль

</template>

<script>
import PageHeader from '~/components/PageHeader'
export default {
  components: { PageHeader },
}
</script>

<style lang="scss">
.profile-page {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
