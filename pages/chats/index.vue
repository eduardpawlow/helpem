<template lang="pug">
  .chats-page  
    PageHeader
      template(v-slot:page-header)
        .page-header-title Чат
    .dialog-list
      DialogListitem(v-for="dialog in dialogs" :options="dialog")

</template>

<script>
import PageHeader from '~/components/PageHeader'
import DialogListitem from '~/components/chat/DialogListitem'

export default {
  components: { PageHeader, DialogListitem },
  data: () => ({}),
  computed: {
    dialogs() {
      return this.$store.state.dialogs
    },
  },
}
</script>

<style lang="scss">
.chats-page {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
