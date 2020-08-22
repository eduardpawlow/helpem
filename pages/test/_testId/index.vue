<template lang="pug">
  .test-page.container
    template(
        v-if="card"

    )
      .test__wrapper(
      )
        .test__logo
          img(:src="card.img ")
        .test__info
          .test__info__title {{ card.title }}
          .test__info__mark Оценка: {{ card.mark }}
          .test__info__format Формат: {{ card.format }}
        
      .test__modules
        .test__modules__item(
          v-for="(item, index) in card.modules"
        )
          .item__module-number {{ index+1 }} модуль
          .item__module-card(
            @click="$router.push(`/test/${$route.params.testId}/${item.id}`)"  
          ) {{item.title}}
</template>

<script>
export default {
  data: () => {
    return {}
  },
  computed: {
    card() {
      console.log(1)
      return this.$store.state.searchResults.find((el) => {
        return el.id === Number(this.$route.params.testId)
      })
    },
  },
  mounted() {},
}
</script>

<style lang="scss">
.test-page {
  padding-top: 50px;
  .test__wrapper {
    display: flex;
    height: max-content;
    height: 185px;

    &:not(:last-child) {
      margin-bottom: 80px;
    }
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: #ffffff;

    .test__logo {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      border-radius: 20px;
      width: 330px;
      min-width: 330px;
      min-height: 185px;
      height: auto;
      margin-right: 40px;

      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      text-align: center;
      color: #004e8f;
      cursor: pointer;
      user-select: none;

      img {
        height: 100%;
        width: auto;
      }
    }

    .test__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .test__title {
        font-weight: bold;
        font-size: 24px;
        line-height: 33px;
      }

      .test__mark,
      .test__format {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        color: #def4fe;
      }

      .test__button {
        padding: 15px 0;
        width: 185px;
      }
    }
  }

  .test__modules {
    display: flex;
    justify-content: space-between;

    .test__modules__item {
      display: flex;
      flex-direction: column;

      .item__module-number {
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        text-align: center;
        color: #ffffff;
      }

      .item__module-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 330px;
        height: 180px;
        margin-top: 40px;
        background: #def4fe;
        border-radius: 10px;

        font-weight: 600;
        font-size: 21px;
        line-height: 29px;
        cursor: pointer;
        /* identical to box height */

        text-align: center;

        color: #004e8f;
      }
    }
  }
}
</style>
