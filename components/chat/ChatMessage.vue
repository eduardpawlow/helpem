<template lang="pug">
  .chat-message__wrapper(
    :class="[message.type, {own: message.isOwner}]"
  )
    .chat-message
      .chat-message__top
        .chat-message__create-time {{ formatTime(message.createdAt) }}
        .chat-message__task-title {{ message.taskTitle }}
        .chat-message__author {{ message.author }}
      .chat-message__middle
        .chat-message__text
          template(v-if="message.tasks && message.tasks.length !== 0")
            ol.tasks-list
              li(v-for="(task, index) in message.tasks") {{ task }}
          div(v-else)
            | {{ message.text }}
      .chat-message__bottom(v-if="message.taskDeadline")
        .chat-message__deadline {{ formatTime(message.taskDeadline) }}
        .chat-message__important
          span(v-if="message.isImportant") Важно 
    .chat-message__workers-wrapper(v-if="message.taskWorkers")
      .chat-message__workers {{ message.taskWorkers.map((el=>(el.first_name))).join(', ')  }}
      .chat-message__reaction ✅ {{ message.reactions.accept }} ❎ {{ message.reactions.reject }}
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => ({}),
    },
  },
  data: ({ $options }) => ({}),
  computed: {},
  methods: {
    formatTime(timeString) {
      const time = new Date(timeString)

      return time.toLocaleTimeString('ru', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.chat-message__wrapper {
  position: relative;
  max-width: 100%;
  width: 100%;
  word-break: break-all;

  &.task {
    padding-bottom: 30px;

    .chat-message {
      .chat-message__middle {
        .chat-message__text {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  &.message {
    .chat-message {
      .chat-message__middle {
        .chat-message__text {
          padding: 0 30px;
        }
      }
    }
  }

  .chat-message {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #f3f6f9;
    border-radius: 5px;

    .chat-message__top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .chat-message__create-time {
        width: fit-content;
        padding: 5px 10px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #b6d9f1;
        border-radius: 0px 0px 20px 0px;
        font-size: 8px;
        line-height: 20px;
      }

      .chat-message__task-title {
        max-width: 50%;
        width: 50%;
        font-weight: bold;
        font-size: 10px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.1px;
        text-transform: uppercase;
        color: #000000;
        padding: 5px 0px;
      }

      .chat-message__author {
        font-size: 8px;
        line-height: 20px;
        letter-spacing: 0.1px;
        color: #000000;
        padding: 5px;
      }
    }

    .chat-message__middle {
      padding: 20px 0;

      .chat-message__text {
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.1px;
        color: #000000;

        .tasks-list {
          li {
            list-style: decimal;
          }
        }
      }
    }

    .chat-message__bottom {
      display: flex;

      .chat-message__deadline {
        width: fit-content;
        padding: 5px 10px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #b6d9f1;
        border-radius: 0px 20px 0px 0px;
        font-size: 8px;
        line-height: 20px;
      }

      .chat-message__important {
        color: #1fa2ff;
        width: 50%;
        text-align: center;
        padding: 5px 10px;
      }
    }

    .chat-message__time {
      text-align: right;
      font-size: 11px;
      line-height: 140%;
      color: #7c7d7e;

      .chat-message__read-status {
        position: relative;
        margin-left: 1px;
      }
    }
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  &.own {
    align-self: flex-end;
    margin-right: 10px;
  }

  .chat-message__workers-wrapper {
    position: absolute;
    padding: 5px;
    background: #b6d9f1;
    border-radius: 0px 0px 0px 15px;
    width: fit-content;
    right: 0;
    bottom: 0;

    .chat-message__workers {
      font-size: 8px;
      height: 30px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: #000000;
      font-size: 8px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: #000000;
    }

    .chat-message__reaction {
      font-size: 10px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: #000000;
    }
  }
}
</style>
