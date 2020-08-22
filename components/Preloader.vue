<template lang="pug">
  .preloader-w
    .preloader
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.preloader-w {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @keyframes preloader-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .preloader {
    display: inline-block;
    border: 6px solid #fff;
    border-left-color: #403897;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: preloader-spin 1.2s linear infinite;
  }
}
</style>
