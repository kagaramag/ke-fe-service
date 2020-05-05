import AxiosHelper from "@/helpers/AxiosHelper";

export default {
  // initial state
  state: {
    fetch_education: {
      education: [],
      errors: {},
      message: "",
      loading: false
    }
  },
  // getters
  getters: {
    fetch_education(state) {
      return state.fetch_education.education;
    }
  },

  // mutations
  mutations: {
    FETCH_EDUCATION_FAILURE(state) {
      state.fetch_education.education = [];
    }
  },

  // actions
  actions: {
    // fetch education
    FETCH_EDUCATION: (context, payload) => {
      AxiosHelper.get(`/education/${payload}`)
        .then(response => {
          context.commit("FETCH_EDUCATION_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_EDUCATION_FAILURE", error.response.data);
        });
    },

    
  }
};
