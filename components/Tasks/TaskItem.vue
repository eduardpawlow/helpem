<template lang="pug">
  .task-item(:class="task.status.toLowerCase()")
    .title {{ task.title }}
    .deadline {{ formatTime(task.deadline) }}
    .info Инфо {{ '' }}
    .important Важность: {{ task.important }}
    .warning(v-if="task.isWarning") !
</template>

<script>
export default {
  props: ['task'],
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
.task-item {
  position: relative;
  padding: 10px 15px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 2px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  &:not(:first-child) {
    margin-top: 15px;
  }

  & > * {
    margin-bottom: 5px;
  }

  &.complete {
    background: #c6ffb8;
  }

  &.canceled {
    background: #ffa2a2;
  }

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #000000;
  }

  .deadline {
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.2px;
  }
  .info,
  .important {
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.2px;
    color: #818c99;
  }

  .warning {
    position: absolute;
    bottom: 10px;
    right: 10px;

    font-weight: 900;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: 0.2px;
    color: #6fcf97;
  }
}
</style>
