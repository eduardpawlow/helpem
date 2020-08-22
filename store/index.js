export const state = () => ({
  user: {
    first_name: 'Эдуард',
    last_name: 'Павлов',
    isAuthorized: false,
  },
  searchResults: [
    {
      id: 1,
      title: 'Основы программирования на Python',
      format: 'Видео',
      mark: '4,5',
      img: '/tests/python.png',
      modules: [
        {
          id: 1,
          title: 'Прикладные задачи анализа данных',
        },
        {
          id: 2,
          title: 'Введение в данные',
        },
        {
          id: 3,
          title: 'Математика и Python для анализа данных',
        },
      ],
    },
    {
      id: 2,
      title: 'Введение в язык Котлин',
      format: 'Видео',
      mark: '4,8',
      img: '/tests/kotlin.png',
      modules: [
        {
          id: 4,
          title: 'Основы Kotlin',
        },
        {
          id: 5,
          title: 'Основы ООП',
        },
        {
          id: 6,
          title: 'Примеры задач для решения',
        },
      ],
    },
    {
      id: 3,
      title: 'Введение в науку о данных',
      format: 'Видео',
      mark: '4,4',
      img: '/tests/tt.png',
      modules: [
        {
          id: 7,
          title: 'Прикладные задачи анализа данных',
        },
        {
          id: 8,
          title: 'Введение в данные',
        },
        {
          id: 9,
          title: 'Математика и Python для анализа данных',
        },
      ],
    },
  ],
})

export const mutations = {
  SET_AUTHORIZE_USER(state, bool) {
    state.user.isAuthorized = bool
  },
}

export const actions = {}
