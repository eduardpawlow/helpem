<template lang="pug">
  .tasks-page  
    PageHeader
      template(v-slot:page-header)
        .page-header-title Задачи
          svg-icon(name="filters" width="28" height="28")
    .tabs
      .tab(
        v-for="tab in tabs"
        :class="{active: tab.id === selectedTab}"
        @click="selectTab(tab.id)"
      ) {{ tab.title }}
    .tasks-list
      TaskItem(v-for="task in filteredTasks" :task="task")
</template>

<script>
import PageHeader from '~/components/PageHeader'
import TaskItem from '~/components/Tasks/TaskItem'

const tasks = {
  groups: [
    {
      title: 'Ядерное топливо UO2 R=3.0% 0/100кг',
      deadline: new Date().toISOString(),
      isWarning: false,
      status: 'CANCELED',
      important: 'бессрочно',
    },
    {
      title: 'Ядерное топливо UO2 R=4.95% 710/1000кг',
      deadline: new Date().toISOString(),
      isWarning: true,
      status: 'IN_PROGRESS',
      important: 'срочно',
    },
    {
      title: 'Транспотировка контейнера 3/3шт',
      deadline: new Date().toISOString(),
      isWarning: false,
      status: 'COMPLETE',
      important: 'бессрочно',
    },
  ],
  personal: [
    {
      title: 'Ядерное топливо 0/50кг',
      deadline: new Date().toISOString(),
      isWarning: false,
      status: 'CANCELED',
      important: 'бессрочно',
    },
    {
      title: 'Уголь 500/500кг',
      deadline: new Date().toISOString(),
      isWarning: true,
      status: 'COMPLETE',
      important: 'срочно',
    },
  ],
}

export default {
  components: { PageHeader, TaskItem },
  data: () => ({
    tabs: [
      { id: 'groups', title: 'Общие' },
      { id: 'personal', title: 'Личные' },
    ],
    selectedTab: 'groups',
    tasks,
  }),
  computed: {
    filteredTasks() {
      return this.tasks[this.selectedTab]
    },
  },
  methods: {
    selectTab(id) {
      this.selectedTab = id
    },
  },
}
</script>

<style lang="scss">
.tasks-page {
  display: flex;
  flex-direction: column;
  width: 100%;

  .page-header-title {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-left: 10px;
    }
  }

  .tabs {
    display: flex;

    font-weight: 500;
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 0.2px;

    .tab {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid #e0e0e0;

      color: #8e8e8e;

      &.active {
        color: #000;
        border-bottom: 2px solid #000;
      }
    }
  }

  .tasks-list {
    padding: 30px 10px;
  }
}
</style>
