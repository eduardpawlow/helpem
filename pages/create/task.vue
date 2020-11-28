<template lang="pug">
  .create-task-page  
    PageHeader
      template(v-slot:page-header)
        .page-header-title Создать задачу
    
    form.create-task-form
      CustomInput.full-width(
        label="Дата",
        placeholder="29/11/2020"
      )
      CustomInput.full-width(
        label="Заголовок"
        placeholder="Заполните..."
      )
      CustomTextarea.full-width(
        label="Описание задачи",
        placeholder="Заполните..."
        rows="6"
      )
      CustomSelect(
        label="Исполнитель"
        placeholder="Выберите..."
        :items="workers"
        :selected="form.worker"
        v-model="form.worker"
      )
      CustomSelect(
        label="Приоритет"
        placeholder="Выберите..."
        :items="importantLevels"
        :selected="form.level"
        v-model="form.level"
      )
      CustomInput.full-width(
        label="Срок исполнения",
        placeholder="29/11/2020"
      )

      .answer-requires--wrapper
        label Требования к ответу
        .answer-requires
          CustomCheckbox(withLabel v-for="req in requiresToAnswer" :checked="form.selectedRequires.includes(req)" @input="toggleSelected(req)")
            | {{req}}
      .submit-wrapper
        button.submit Отправить

    .voicemicro
      .voicemicro-inner
        .icon
          svg-icon(name="voicemicro" width="30" height="30" fill="#fff") 
</template>

<script>
import PageHeader from '~/components/PageHeader'
import CustomInput from '~/components/UI/CustomInput'
import CustomTextarea from '~/components/UI/CustomTextarea'
import CustomSelect from '~/components/UI/SelectTwo'
import CustomCheckbox from '~/components/UI/CustomCheckbox'

export default {
  components: {
    PageHeader,
    CustomInput,
    CustomTextarea,
    CustomSelect,
    CustomCheckbox,
  },
  data: () => ({
    workers: ['Иван Петров', 'Петров Иван'],
    importantLevels: [
      { id: 1, title: '1 приоритет' },
      { id: 2, title: '2 приоритет' },
      { id: 3, title: '3 приоритет' },
    ],
    requiresToAnswer: ['Добавить медиа', 'Описать выполненную задачу'],
    form: {
      worker: '',
      level: {},
      selectedRequires: [],
    },
  }),
  computed: {
    dialogs() {
      return this.$store.state.dialogs
    },
  },
  created() {
    this.$store.commit('SET_NAV_HIDDEN', true)
  },
  destroyed() {
    this.$store.commit('SET_NAV_HIDDEN', false)
  },
  methods: {
    toggleSelected(req) {
      if (this.form.selectedRequires.includes(req))
        this.form.selectedRequires = this.form.selectedRequires.filter(
          (el) => el !== req
        )
      else this.form.selectedRequires.push(req)
    },
  },
}
</script>

<style lang="scss">
.create-task-page {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  .voicemicro {
    position: fixed;
    bottom: 40px;
    right: 20px;
    width: 92px;
    height: 92px;
    display: flex;
    border-radius: 50%;
    background: rgba(18, 216, 250, 0.3);

    .voicemicro-inner {
      width: 75px;
      height: 75px;
      margin: auto;
      border-radius: 50%;
      background: linear-gradient(90deg, #1fa2ff 0%, #12d8fa 50%, #a6ffcb 100%);

      .icon {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .create-task-form {
    padding: 10px;

    .answer-requires--wrapper {
      margin-top: 20px;

      label {
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #6d7885;
      }
      .answer-requires {
        margin-top: 10px;
        .checkbox-container {
          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
    }

    .submit-wrapper {
      margin-top: 40px;
      display: flex;
      justify-content: center;

      .submit {
        background: #4986cc;
        border-radius: 8px;
        padding: 15px 20px;

        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.1px;
        color: #fff;
      }
    }
  }
}
</style>
