import AxiosHelper from '@/helpers/AxiosHelper'

export default {
  // initial state
  state: {
    compose_tutoring: {
      tutorship: {},
      errors: {},
      message: '',
      loading: false,
    },
    tutoring_messages: {
      tutoring: {},
      errors: {},
      message: '',
      loading: false,
    },
  },
  // getters
  getters: {
    compose_tutoring(state) {
      return state.compose_tutoring
    },
    tutoring_messages(state) {
      return state.tutoring_messages
    },
  },

  // mutations
  mutations: {
    FETCH_TUTORING_MESSAGES_SUCCESS(state, payload) {
      state.tutoring_messages.loading = false
      state.tutoring_messages.tutoring = { ...state.tutoring_messages.tutoring, ...payload }
    },
    FETCH_TUTORING_MESSAGES_FAILURE(state, payload) {
      state.tutoring_messages.errors = payload
    },
    COMPOSE_TUTORSHIP_SUCCESS(state, payload) {
      state.compose_tutoring.loading = false
      state.compose_tutoring.tutorship = { ...state.compose_tutorship.tutorship, ...payload.tutorship }
    },
    COMPOSE_TUTORSHIP_FAILURE(state, payload) {
        state.compose_tutoring.errors = payload
    },
  },
  // actions
  actions: {
    // compose tutoring message 
    COMPOSE_TUTORING: (context, payload) => {
      const tutoringId = payload.tutoringId;
      delete payload.tutoringId;
      context.commit('RESET_ERROR')
      context.commit('SITE_LOADING', true)
      AxiosHelper.post(`/tutorship/${tutoringId}`, payload)
        .then(response => context.commit('COMPOSE_TUTORSHIP_SUCCESS', response.data))
        .catch(error => context.commit('COMPOSE_TUTORSHIP_FAILURE', error))
    },
    // fetch tutoring message 
    FETCH_TUTORING_MESSAGES: (context, payload) => {
      AxiosHelper.get(`/tutorship/${payload}`)
        .then(response => {
          context.commit('FETCH_TUTORING_MESSAGES_SUCCESS', response.data)
        })
        .catch(error => {
          context.commit('FETCH_TUTORING_MESSAGES_FAILURE', error)
        })
    },
  }
}
