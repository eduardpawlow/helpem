<template lang="pug">
  .module-page
    .module-page-content
      .first-screen.container
        .module-page__title Базы данных (Databases)
        p.module-page__description База данных — это систематизированная система материалов, с возможностью их поиска и обработки. Данный курс познакомит слушателей с наиболее популярными системами управления базами данных, их особенностями и моделями. В результате освоения материалов курса учащиеся смогут проектировать базы данных, понимать как составлять запросы и индексировать данные. Особое место в курсе отведено изучению языка программирования SQL. В рамках курса будут рассмотрены такие понятия, как Представления, процедуры, функции, триггеры. Индексирование данных. Также будут рассмотрены такие современные подходы к обработке BigData, сферы применения СУБД NoSQL. В курсе предусмотрено выполнения практических заданий на базе СУБД MySQL, что качественно улучшает восприятие материала.
        .module-page__subtitle Оценка материала
        .module-page__mark 4,8
        .module-page__subtitle Прогресс
        .module-page__progresbar
          .progres-status
          .progres-percent 56%
    .test-content.container
      .test-content__title Тестовый формат
      .test-content__menu
        button.purple_btn.test-content__btn Скачать
        .test-content__menu_understand
          span Понятно
          span Непонятно
      .test-content__secete
        .test-content__title.center Освоено?
        .test-content__secete-btns
          button.purple_btn.test-content__btn Да
          button.purple_btn.test-content__btn Нет
      .test-content__recom
        .test-content__title То, что вам может понравится
          .test-content__recom__cards
            .test-content__recom__card Прикладные задачи анализа данных
            .test-content__recom__card Введение в данные
            .test-content__recom__card Математика и Python для анализа данных

</template>

<script>
export default {
  layout: 'white',
}
</script>

<style lang="scss">
.module-page {
  display: flex;
  flex-direction: column;
  flex: 1;

  .module-page-content {
    display: flex;
    flex: 1;
    background: linear-gradient(180deg, #40c7da -3.56%, #514a9d 105.57%);
    padding-top: 195px;
    padding-bottom: 115px;
    .first-screen {
      .module-page__title {
        font-weight: 800;
        font-size: 60px;
        line-height: 82px;
        color: #ffffff;
      }

      .module-page__description {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        color: #ffffff;
      }

      .module-page__subtitle {
        margin-top: 20px;
        font-weight: bold;
        font-size: 30px;
        line-height: 41px;
        color: #ffffff;
      }
      .module-page__mark {
        margin-top: 20px;
        font-weight: bold;
        font-size: 24px;
        line-height: 33px;
        color: #ffffff;

        background: #514a9d;
        border-radius: 80px;
        padding: 20px 40px;
        width: max-content;
      }

      .module-page__progresbar {
        display: flex;
        width: max-content;
        margin-top: 30px;

        .progres-status {
          width: 580px;
          height: 30x;
          background: #f2eeff;
          border-radius: 30px;
          margin-right: 10px;

          &::before {
            content: '';
            display: block;
            height: 100%;
            width: 56%;
            background: #514a9d;
            border-radius: 30px;
          }
        }
        .progres-percent {
          font-size: 16px;
          line-height: 22px;
          color: #ffffff;
        }
      }
    }
  }

  .test-content {
    padding: 120px 0 300px;

    .test-content__title {
      font-style: normal;
      font-weight: bold;
      font-size: 60px;
      line-height: 82px;
      color: #004e8f;

      &.center {
        text-align: center;
      }
    }

    .test-content__menu {
      display: flex;
      align-items: center;
      margin-top: 60px;

      .test-content__btn {
        margin-right: 100px;
      }

      span {
        font-size: 21px;
        line-height: 29px;
        text-align: center;
        color: #32406f;

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }

    .test-content__btn {
      width: 315px;
      padding: 30px 0;
    }
  }

  .test-content__secete {
    margin-top: 230px;
    .test-content__secete-btns {
      display: flex;
      justify-content: center;
      margin-top: 30px;

      .test-content__btn {
        &:not(:last-child) {
          margin-right: 80px;
        }
      }
    }
  }
  .test-content__recom {
    margin-top: 230px;
    .test-content__recom__cards {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 180px;

      .test-content__recom__card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 328px;
        height: 174px;
        background: #def4fe;
        border-radius: 10px;

        font-weight: 600;
        font-size: 21px;
        line-height: 29px;
        text-align: center;

        color: #004e8f;

        &:not(:last-child) {
          margin-right: 70px;
        }
      }
    }
  }
}
</style>
