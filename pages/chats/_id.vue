<template lang="pug">
  .messages-page  
    PageHeader
      template(v-slot:page-header)
        .page-header-title {{ chatTitle }}
    .messages-list
      .overlay(v-if="attachIsOpen" @click="toggleAddAttachment ")
      Message(v-for="message in messages" :message="message")
    .create-message__wrapper
      .create-message__attachment-types(v-if="attachIsOpen")
        nuxt-link.attach_type-wrapper(v-for="attachType in attachmentTypes" :to="attachType.to")
          svg-icon.attach_type-icon(:name="attachType.icon" width="30" height="30")
          .attach_type-title {{attachType.title}}
      .create-message__add-attach-btn.create-message__icon(
        @click="toggleAddAttachment"
      )
        svg-icon(name="paperclip" width="28" height="28")
      .create-message__input-wrapper
        .create-message__input(   
          tabindex="0"
          contenteditable
          ref="messageInput"
          @input="emptyMessageChecker"
        )
        .placeholder
          .placeholder__content Напишите сообщение...
      .create-message__send-btn.create-message__icon
        span(
          v-if="emptyMessage"
        )
          svg-icon(name="voicemicro" width="24" height="24")
        span(
          v-else
          @click="sendMessage"
        )
          svg-icon(name="chat/send" width="24" height="24")

</template>

<script>
import PageHeader from '~/components/PageHeader'
import Message from '~/components/chat/ChatMessage'

function stripTags(text, exclude = []) {
  const excludeTags = exclude.map((tag) => `(?!${tag})`).join('')
  const regexp = new RegExp(`<\\/?${excludeTags}[A-Za-z]+[^>]*>`, 'g')
  const cleanText = text.replace(/<br>/gi, ' ')
  return cleanText.replace(regexp, '')
}

const attachmentTypes = [
  { icon: 'attach_type_task', title: 'Задача', to: '/create/task' },
  { icon: 'attach_type_photo', title: 'Фото', to: '' },
  { icon: 'attach_type_file', title: 'Файл', to: '' },
  { icon: 'attach_type_contacts', title: 'Контакты', to: '' },
]

export default {
  components: { PageHeader, Message },
  data: () => ({
    attachmentTypes,
    emptyMessage: true,
    attachIsOpen: false,
  }),
  computed: {
    messages() {
      return this.$store.state.messages[this.$route.params.id] || []
    },
    chatTitle() {
      const findedObject = this.$store.state.dialogs.find(
        (el) => el.id === +this.$route.params.id
      )

      if (findedObject) {
        return findedObject.title
      } else {
        return `Чат`
      }
    },
  },
  created() {
    this.$store.commit('SET_NAV_HIDDEN', true)
  },
  destroyed() {
    this.$store.commit('SET_NAV_HIDDEN', false)
  },
  methods: {
    sendMessage() {
      const msg = stripTags(this.$refs.messageInput.textContent).trim()

      this.$store.commit('ADD_MESSAGE', { msg, chatId: this.$route.params.id })
    },
    toggleAddAttachment() {
      this.attachIsOpen = !this.attachIsOpen
    },
    emptyMessageChecker() {
      if (!this.$refs.messageInput) {
        this.emptyMessage = true
        return
      }

      const value = this.$refs.messageInput.innerHTML

      this.emptyMessage = !stripTags(value).trim()
    },
  },
}
</script>

<style lang="scss">
.messages-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;

  .messages-list {
    position: relative;
    padding-bottom: 90px;
    .overlay {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 10;
    }

    &__wrapper {
      display: grid;
      overflow-y: auto;
      overflow-x: hidden;
      flex: 1;
    }

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
    padding-left: 15px;
  }

  .create-message__wrapper {
    position: fixed;
    z-index: 20;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 450px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 15px 30px 15px 10px;
    max-height: 150px;
    background: #fff;

    .create-message__attachment-types {
      position: absolute;
      min-height: 90px;
      height: 90px;
      top: -85px;
      left: 10px;
      right: 10px;
      background: #eef3f6;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      padding: 0 50px;

      .attach_type-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-size: 10px;
        line-height: 20px;
        min-width: 50px;
        user-select: none;

        .attach_type-icon {
        }
        .attach_type-title {
        }
      }
    }

    .create-message__input-wrapper {
      position: relative;
      flex: 1;
      margin: 0 10px;

      font-size: 14px;
      line-height: 16px;

      .create-message__input {
        padding: 12px 15px;
        background: #f8f9fb;
        border: 1px solid rgba(124, 125, 126, 0.3);
        max-height: 130px;
        min-height: 42px;
        max-width: 570px;
        overflow-y: auto;

        &[contentEditable='true']:empty + .placeholder {
          display: block;
        }

        &[contentEditable='true']:empty:focus + .placeholder {
          display: none;
        }
      }

      .placeholder {
        display: none;
        width: 100%;
        pointer-events: none;
        user-select: none;
        color: #7c7d7e;

        &__content {
          top: 12px;
          left: 15px;

          position: absolute;
        }
      }
    }
    .create-message__add-attach-btn,
    .create-message__send-btn {
      display: flex;
      height: 40px;
      align-items: center;

      cursor: pointer;
    }
  }

  .create-message__attachments-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .create-message__icon {
    fill: #99a2ad;

    &:hover {
      fill: #3f8ae0;
    }
  }

  // Создание и отправка сообщения
  &.disabled {
    pointer-events: none;

    .create-message__wrapper
      .create-message__input-wrapper
      .create-message__input {
    }
  }
}
</style>
