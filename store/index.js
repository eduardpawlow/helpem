export const state = () => ({
  hiddenNav: false,
  dialogs: [
    {
      id: 1,
      avatar: null,
      title: 'Ремонтная бригада',
      last_message: 'Перейдите в локальный кабинет rf,bytn rf,bytn ',
      last_message_owner: 'Артур С',
      messages: 3,
      time: '2м',
    },
    {
      id: 2,
      avatar: null,
      title: 'Цех №1',
      last_message: 'Перейдите в локальный кабинет rf,bytn rf,bytn ',
      last_message_owner: 'Артур С',
      messages: 2,
      time: '3м',
    },
    {
      id: 3,
      avatar: null,
      title: 'Отдел кадров',
      last_message: 'Перейдите в локальный кабинет rf,bytn rf,bytn ',
      last_message_owner: 'Роман А',
      messages: 12,
      time: '10м',
    },
    {
      id: 4,
      avatar: null,
      title: 'Цех №2',
      last_message: 'Выполнено',
      last_message_owner: 'Виктор С',
      messages: 0,
      time: '55м',
    },
    {
      id: 5,
      avatar: null,
      title: 'Корпус №1',
      last_message: 'Перейдите в локальный кабинет rf,bytn rf,bytn ',
      last_message_owner: 'Сергей И',
      messages: 1,
      time: '1ч',
    },
  ],
  messages: {
    1: [
      {
        id: 1,
        type: 'task',
        text: 'Привет',
        createdAt: new Date().toISOString(),
        updatedAt: '',
        isOwner: true,
        author: 'Елена Викторовна',
        taskTitle: 'Ремонт генератора',
        tasks: [
          'Провести инструктаж',
          'Соблюдать требования безопасности',
          'Ожидание комиссии',
        ],
        taskDeadline: new Date(Date.now() + 80000000).toISOString(),
        isImportant: true,
        taskWorkers: [
          {
            first_name: 'Иван',
            last_name: 'Петров',
          },
          {
            first_name: 'Петр',
            last_name: 'Иванов',
          },
        ],
        reactions: {
          accept: 2,
          reject: 0,
        },
      },
      {
        id: 1,
        type: 'message',
        text: 'Всем привет! Это задачи на сегодня!',
        createdAt: new Date().toISOString(),
        updatedAt: '',
        isOwner: true,
        author: 'Елена Викторовна',
      },
      {
        id: 1,
        type: 'message',
        text: 'Привет! Хорошо.',
        createdAt: new Date().toISOString(),
        updatedAt: '',
        isOwner: true,
        author: 'Иван Петров',
      },
      {
        id: 1,
        type: 'message',
        text: 'Добрый день!',
        createdAt: new Date().toISOString(),
        updatedAt: '',
        isOwner: true,
        author: 'Петр Иванов',
      },
    ],
    2: [
      {
        id: 1,
        type: 'task',
        text: 'Привет',
        createdAt: new Date().toISOString(),
        updatedAt: '',
        isOwner: true,
        author: 'Елена Викторовна',
        taskTitle: 'Ремонт генератора',
        tasks: [
          'Провести инструктаж',
          'Соблюдать требования безопасности',
          'Ожидание комиссии',
        ],
        taskDeadline: new Date(Date.now() + 80000000).toISOString(),
        isImportant: true,
        taskWorkers: [
          {
            first_name: 'Иван',
            last_name: 'Петров',
          },
          {
            first_name: 'Петр',
            last_name: 'Иванов',
          },
        ],
        reactions: {
          accept: 2,
          reject: 0,
        },
      },
    ],
  },
})

export const mutations = {
  SET_NAV_HIDDEN(state, val) {
    state.hiddenNav = val
  },
  ADD_MESSAGE(state, obj) {
    state.messages[obj.chatId].push({
      id: 1,
      type: 'message',
      text: obj.msg,
      createdAt: new Date().toISOString(),
      updatedAt: '',
      isOwner: true,
      author: 'Елена Викторовна',
    })
  },
}

export const actions = {}
