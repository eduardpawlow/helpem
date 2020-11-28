<template lang="pug">
  nav
    nuxt-link.nav-item(v-for="link in links" :to="link.href")
      svg-icon.nav-item-icon(:name="link.icon" width=28 height=28)
      .nav-item-title {{ link.title }}
</template>

<script>
const links = [
  {
    title: 'Профиль',
    icon: 'profile',
    href: '/profile',
  },
  {
    title: 'Задачи',
    icon: 'tasks',
    href: '/tasks',
  },
  {
    title: 'Сообщения',
    icon: 'chat',
    href: '/chats',
  },
]

export default {
  data: () => ({
    links,
  }),
}
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 450px;
  padding: 10px 20px;
  height: 60px;
  background: #fff;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.2px;
    color: #99a2ad;

    fill: #99a2ad;

    &.nuxt-link-active {
      fill: #0073ff;
    }
  }
}
</style>
