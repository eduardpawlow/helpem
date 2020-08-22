<template lang="pug">
  header.container(
    :class="{transparent, absolute}"
  )
    nuxt-link.logo(
      to="/"
    ) al.stud
    nav.navbar
      template(
        v-if="!user.isAuthorized"
      )
        .navbar__link(
          @click="login"
        ) войти
        .navbar__link регистрация
      template(
        v-else
      )
        .navbar__link личный кабинет
        .navbar__link(
          @click="logout"
        ) выйти


</template>

<script>
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    login() {
      this.$store.commit('SET_AUTHORIZE_USER', true)
      localStorage.setItem('isAuthorized', true)
      this.$router.push('/observer')
    },
    logout() {
      this.$store.commit('SET_AUTHORIZE_USER', false)
      localStorage.removeItem('isAuthorized')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  height: 145px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;

  .logo {
    font-weight: 800;
    font-size: 30px;
    line-height: 41px;
    color: #fff;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: #ffffff;

    .navbar__link {
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 50px;
      }
    }
  }

  &.transparent {
    background-color: transparent;
  }

  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
