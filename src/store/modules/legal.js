import AxiosHelper from '@/helpers/AxiosHelper';
import router from '@/router';
export default {
  // initial state
  state: {
    fetch_documents: {
      documents: [],
      errors: {},
      message: '',
      loading: false
    }
  },
  // getters
  getters: {
    fetch_documents(state) {
      return state.fetch_documents.documents;
    }
  },

  // mutations
  mutations: {
    SITE_LOADING(state, payload) {
      state.fetch_documents.loading = payload;
    },
    FETCH_DOCUMENTS_SUCCESS(state, payload) {
      state.fetch_documents.documents = {
        ...state.fetch_documents,
        ...payload
      };
    },
    FETCH_DOCUMENTS_FAILURE(state) {
      state.fetch_documents.documents = [];
    }
  },
  actions: {
    // fetch documents
    FETCH_DOCUMENTS: (context, payload) => {
      context.commit('SITE_LOADING', true);
      AxiosHelper.get(`/legal`)
        .then(response => {
          context.commit('FETCH_DOCUMENTS_SUCCESS', response.data);
          context.commit('SITE_LOADING', false);
        })
        .catch(error => {
          context.commit('SITE_LOADING', false);
          context.commit('FETCH_DOCUMENTS_FAILURE', error.message);
        });
    },

    UPLOAD_DOCUMENTS: (context, payload) => {
      context.commit('SITE_LOADING', true);
      AxiosHelper.post('/legal', payload)
        .then(response => {
          context.commit('SITE_LOADING', false);
          context.commit('FETCH_DOCUMENTS_SUCCESS', response.data);
        })
        .catch(error => {
          context.commit('SITE_LOADING', false);
          context.commit('FETCH_DOCUMENTS_FAILURE', error.response.data);
        });
    }
  }
};
