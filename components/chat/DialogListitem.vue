<template lang="pug">
  nuxt-link(:to="`/chats/${options.id}`").dialog-list-item 
    .avatar
    .info
      .chat-title {{ options.title }}
      .chat-last-message #[span.owner {{ options.last_message_owner }}:]&nbsp;{{ options.last_message }}
      .time {{ options.time }}
    .count-messages
      span(v-if="options.messages") {{ options.messages }}
</template>

<script>
export default {
  props: ['options'],
}
</script>

<style lang="scss" scoped>
.dialog-list-item {
  display: flex;
  flex-direction: row;
  padding: 10px 15px;

  .avatar {
    width: 56px;
    height: 56px;
    background: #c4c4c4;
    border-radius: 50%;
  }
  .info {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 40px 0 10px;

    .chat-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: #000000;
      margin-bottom: 7px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .chat-last-message {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 15px;
      line-height: 20px;
      color: #6d7885;

      .owner {
        color: #99a2ad;
      }
    }
    .time {
      position: absolute;
      text-align: right;
      bottom: 10px;
      right: 0px;
    }
  }
  .count-messages {
    min-width: 35px;
    span {
      background: #3f8ae0;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
      letter-spacing: 0.2px;
      padding: 0 8px;
      color: #fff;
      border-radius: 12px;
    }
  }
}
</style>
