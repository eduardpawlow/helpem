<template lang="pug">
  .home-page.container
    .title.home-page_title С нами интересней искать
    button.purple_btn(
    ) Попробовать      
</template>

<script>
export default {}
</script>

<style lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .home-page_title {
    margin-bottom: 100px;
    text-align: center;
    color: #ffffff;
  }
  button.purple_btn {
    padding: 30px 0;
    width: 315px;
  }
}
</style>
