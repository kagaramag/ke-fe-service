import AxiosHelper from '@/helpers/AxiosHelper'

export default {
  // initial state
  state: {
    register_kid: {
      kid: {},
      errors: {},
      message: '',
      loading: false,
      registered: false
    },
    fetch_kids: {
      kids: [],
      errors: {},
      message: '',
      loading: false
    },
    requested_tutor: {
      tutor: [],
      errors: {},
      message: '',
      loading: false
    },
    accept_request: {
      data: {},
      errors: {},
      message: '',
      loading: false
    },
    fetch_one_tutoring: {
      tutoring: {},
      errors: {},
      message: '',
      loading: false
    },
    delete_kid: {
      errors: {},
      message: '',
      loading: false,
      deleted: false
    },
    edit_kid: {
      kid: {},
      errors: {},
      message: '',
      loading: false,
      edited: false
    },
    accept_requested: {
      error: {},
      message: '',
      loading: false
    }
  },
  // getters
  getters: {
    fetch_kids (state) {
      return state.fetch_kids
    },
    register_kid (state) {
      return state.register_kid
    },
    requested_tutor (state) {
      return state.requested_tutor
    },
    fetch_one_tutoring (state) {
      return state.fetch_one_tutoring
    },
    delete_kid (state) {
      return state.delete_kid
    },
    edit_kid (state) {
      return state.edit_kid
    }
  },

  // mutations
  mutations: {
    FETCH_KIDS_SUCCESS(state, payload) {
      state.fetch_kids.kids = [];
      state.fetch_kids.kids = [...state.fetch_kids.kids, ...payload.tutoring]
    },
    FETCH_KIDS_FAILURE (state, payload) {
      ;(state.fetch_kids.kids = ''),
      (state.fetch_kids.errors = {
        ...state.fetch_kids,
        error: 'Something went wrong, try again later'
      })
    },
    REGISTER_KID_LOADING (state) {
      ;(state.register_kid.loading = true),
      (state.register_kid.registered = false)
    },
    REGISTER_KID_SUCCESS (state, payload) {
      state.register_kid.loading = false
      state.register_kid.registered = true
      state.register_kid.message = payload.message
      state.register_kid.kid = { ...state.register_kid.kid, ...payload.kid }
      state.fetch_kids.kids = [payload.kid, ...state.fetch_kids.kids]
    },
    REGISTER_KID_FAILURE (state, payload) {
      state.register_kid.loading = false
      state.register_kid.errors = [payload, ...state.register_kid.errors]
    },

    REGISTERED (state, payload) {
      state.register_kid.registered = payload
    },
    RESET_ERROR (state) {
      state.fetch_kids.errors = ''
      state.register_kid.errors = ''
    },
    REQUEST_TUTOR_SUCCESS (state, payload) {
      state.requested_tutor.loading = false
      state.requested_tutor.message = payload.message
      state.requested_tutor.errors = ''
      state.requested_tutor.tutor = {
        ...state.requested_tutor.tutor,
        ...payload.tutor
      }
    },
    REQUEST_TUTOR_FAILURE (state, payload) {
      state.requested_tutor.loading = false
      state.requested_tutor.errors = payload
      state.requested_tutor.message = ''
    },
    ACCEPT_REQUEST_SUCCESS (state, payload) {
      // router.push(`/profile/${payload.user.username}/tutoring/`);
    },
    ACCEPT_REQUEST_FAILURE (state, payload) {
      state.accept_request.loading = false
      state.accept_request.errors = payload
      state.accept_request.message = ''
    },
    FETCH_TUTORING_SUCCESS (state, payload) {
      state.fetch_one_tutoring.tutoring = ''
      state.fetch_one_tutoring.tutoring = payload.tutoring
    },
    FETCH_TUTORING_FAILURE (state, payload) {
      state.fetch_one_tutoring.tutoring = ''
      state.fetch_one_tutoring.errors = {
        error: 'Something went wrong, try again later',
        payload
      }
    },
    INITIATE_KID_DELETE (state) {
      state.delete_kid.errors = ''
      state.delete_kid.message = ''
      state.delete_kid.deleted = false
    },
    INITIATE_KID_LOADING (state, payload) {
      state.delete_kid.loading = payload
    },
    DELETE_KID_SUCCESS (state, payload) {
      state.delete_kid.errors = ''
      state.delete_kid.message = payload.message
      state.delete_kid.deleted = true
    },
    DELETE_KID_FAILURE (state, payload) {
      state.delete_kid.loading = false
      state.delete_kid.errors = payload
      state.delete_kid.message = ''
      state.delete_kid.deleted = false
    },
    INITIATE_KID_EDIT (state) {
      state.edit_kid.errors = '';
      state.edit_kid.message = '';
      state.edit_kid.loading = false;
      state.edit_kid.edited = false
    },
    EDIT_KID_SUCCESS (state, payload) {
      state.edit_kid.errors = '';
      state.edit_kid.loading = false;
      state.edit_kid.edited = true;
      state.edit_kid.message = payload.message;
      state.edit_kid.kid = payload.kid
    },
    EDIT_KID_FAILURE (state, payload) {
      state.edit_kid.errors = payload.errors;
      state.edit_kid.loading = false;
      state.edit_kid.message = '';
      state.edit_kid.edited = false;
      state.edit_kid.kid = ''
    },
  },

  // actions
  actions: {
    // fetch kids
    FETCH_KIDS: context => {
      AxiosHelper.get(`/tutoring`)
        .then(response => {
          context.commit('FETCH_KIDS_SUCCESS', response.data)
        })
        .catch(error => {
          context.commit('FETCH_KIDS_FAILURE', error.response.data)
        })
    },
    INITIATE_KID_REGISTER: context => {
      context.commit('RESET_ERROR')
      context.commit('REGISTER_KID_LOADING', true)
      context.commit('REGISTERED', false)
    },
    REGISTER_KID: (context, payload) => {
      delete payload.id
      context.commit('RESET_ERROR')
      context.commit('REGISTER_KID_LOADING', true)
      context.commit('REGISTERED', false)
      AxiosHelper.post('/kids', payload)
        .then(response => context.commit('REGISTER_KID_SUCCESS', response.data))
        .catch(error =>
          context.commit('REGISTER_KID_FAILURE', error.response.data)
        )
    },
    REQUEST_TUTOR: (context, payload) => {
      context.commit('RESET_ERROR')
      context.commit('SITE_LOADING', true)
      AxiosHelper.post('/tutoring', payload)
        .then(response =>
          context.commit('REQUEST_TUTOR_SUCCESS', response.data)
        )
        .catch(error =>
          context.commit('REQUEST_TUTOR_FAILURE', error.response.data.errors)
        )
    },
    ACCEPT_REQUEST: (context, payload) => {
      context.commit('RESET_ERROR')
      context.commit('SITE_LOADING', true)
      AxiosHelper.put('/tutoring/accept', payload)
        .then(response => {
          context.commit('ACCEPT_REQUEST_SUCCESS', response.data)
          }
        )
        .catch(error => context.commit('ACCEPT_REQUEST_FAILURE', error))
    },
    FETCH_TUTORING_DETAILS: (context, payload) => {
      context.commit('RESET_ERROR')
      context.commit('SITE_LOADING', true)
      context.commit('REGISTERED', false)
      AxiosHelper.get(`/tutoring/${payload}`)
        .then(response =>
          context.commit('FETCH_TUTORING_SUCCESS', response.data)
        )
        .catch(error =>
          context.commit('FETCH_TUTORING_FAILURE', error.response)
        )
    },
    DELETE_KID: (context, payload) => {
      context.commit('INITIATE_KID_DELETE')
      context.commit('INITIATE_KID_LOADING', false)
      AxiosHelper.patch(`/kids/${payload}`)
        .then(response => context.commit('DELETE_KID_SUCCESS', response.data))
        .catch(error =>
          context.commit('DELETE_KID_FAILURE', error.response.data)
        )
    },
    INITIATE_DELETE_KID: context => {
      context.commit('INITIATE_KID_LOADING', false)
      context.commit('INITIATE_KID_DELETE')
    },
    INITIATE_KID_EDIT: context => {
      context.commit('INITIATE_KID_EDIT')
    },
    EDIT_KID: (context, payload) => {
      const id = payload.id
      delete payload.id
      context.commit('INITIATE_KID_EDIT')
      context.commit('INITIATE_KID_LOADING', false)
      AxiosHelper.patch(`/kids/${id}`, payload)
        .then(response => context.commit('EDIT_KID_SUCCESS', response.data))
        .catch(error => context.commit('EDIT_KID_FAILURE', error.response.data))
    }
  }
}
