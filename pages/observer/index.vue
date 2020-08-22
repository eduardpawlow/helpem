<template lang="pug">
  .observer-page.container
    template(
      v-if="userChoice===true"
    )
      .search__tests
        Preloader(
          v-if="isLoading.searching"
        )

        .search(
          v-else-if="searchResults.length === 0"
        )
          .search_title Начните поиск!
          CustomInput.search-input(
            placeholder="Базы данных"
            name="search"
            v-model="searchQuery"
          )
            template(v-slot:after-input-inner)
              .search-button(
                @click="search"
              )
                svg-icon.search-icon(name="search" fill="#004E8F" width="50" height="50")
        .search__results(
          v-else-if="searchResults.length > 0"
        )
          .search__results__item(
            v-for="item in searchResults"
            :key="`search-result-${item.id}`"
          )
            .search__results__item__logo
              img(:src="item.img")
            .search__results__item__info
              .item__info__title {{ item.title }}
              .item__info__mark Оценка: {{ item.mark }}
              .item__info__format Формат: {{ item.format }}
              button.purple_btn.item__info__button(
                @click="goToTest(item.id)"
              ) Смотреть

          
            

    template(
      v-else-if="userChoice===false"
    )

      .observer(
        v-if="!completeTest"
      )
        .observer__title.title
          | Вы предпочитаете...
        .observer__step Вопрос 1/10
        .observer__answers
          .observer__answers__item(
          ) Технические науки
          .observer__answers__item Гуманитарные науки
        button.purple_btn.continue-btn(
          @click="completeTest = true"
        ) Далее

      .connect-socials__block(
        v-else
      )
        .connect-socials_title.title Желаете ли вы подключить социальные сети?
        .connect-socials
          .connect-socials__item
            img(src="/vk.png")
          .connect-socials__item
            img(src="/facebook.png")

        .connect-socials_continue(
          @click="goToTest(1)"
        ) Пропустить


    template(
      v-else
    )
      .choices
        .choices__title.title Я...
        .choices__card-wrapper
          .choices__card(
            @click="userChoice=true"
          ) Знаю, что ищу
          .choices__card(
            @click="userChoice=false"
          ) Не знаю, что ищу
          
</template>

<script>
import CustomInput from '~/components/CustomInput.vue'
import Preloader from '~/components/Preloader.vue'

export default {
  components: {
    CustomInput,
    Preloader,
  },
  data: () => ({
    userChoice: null,
    searchQuery: '',
    countClickOnTech: 0,
    completeTest: false,
    searchResults: [],
    isLoading: {
      searching: false,
    },
  }),
  methods: {
    search() {
      this.isLoading.searching = true
      setTimeout(() => {
        this.searchResults = [...this.$store.state.searchResults]
        this.isLoading.searching = false
      }, 1500)
    },
    goToTest(testId) {
      this.isLoading.searching = true
      setTimeout(() => {
        this.$router.push(`/test/${testId}`)
      }, 1500)
    },
  },
}
</script>

<style lang="scss" src="./style.scss"></style>
