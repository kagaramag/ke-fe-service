import FirebaseHelper from "@/helpers/FirebaseHelper";
import router from "@/router";

export default {
  state: {
    get_tutors: {
      tutors: [],
      loaded: false,
      success: false,
      errors: {},
      message: ''
    },
    create_tutor: {
      loading: false,
      success: false,
      errors: '',
      message: ''
    },
  },
  getters: {
    get_tutors(state) {
      return state.get_tutors;
    },
    create_tutor(state) {
      return state.create_tutor;
    }
  },

  mutations: {
    RESET_CREATE_TUTOR(state, payload) {
      state.create_tutor.loading = false;
      state.create_tutor.success = false;
      state.create_tutor.message = "";
    },
    LOADING_CREATE_TUTOR(state, payload) {
      state.create_tutor.loading = true;
      state.create_tutor.success = false;
      state.create_tutor.message = "";
    },
    CREATE_CREATE_TUTOR_SUCCESS(state, payload) {
      state.create_tutor.loading = false;
      state.create_tutor.success = true;
      state.create_tutor.message = "You have created a tutor successfully.";
      router.go();
    },
    CREATE_CREATE_TUTOR_FAILURE(state, payload) {
      state.create_tutor.loading = false;
      state.create_tutor.success = false;
      state.create_tutor.errors = payload;
      state.create_tutor.message = "Something went wrong while creating a tutor.";
    },
    FETCH_TUTORS_SUCCESS(state, payload) {
      console.log('payload', payload);
      state.get_tutors.tutors = payload;
      state.get_tutors.loaded = true;
      state.get_tutors.success = true;
    },
    FETCH_TUTORS_FAILURE(state, payload) {
      state.get_tutors.tutors = [];
      state.get_tutors.loaded = true;
      state.get_tutors.success = false;
      state.get_tutors.error = "Sorry, something went wrong! Please , reflesh the page!";
    },
  },
  actions: {
    createTutor: (context, payload) => {
      context.commit("LOADING_CREATE_TUTOR");
      FirebaseHelper.save(`/tutors`, payload)
      .then(response => {
        context.commit("CREATE_CREATE_TUTOR_SUCCESS", response);
      })
      .catch(error => {
        context.commit("CREATE_CREATE_TUTOR_FAILURE", error);
      });
    },
    fetchTutors: (context) => {
      FirebaseHelper.get(`/tutors`)
      .then(response => {
        context.commit("FETCH_TUTORS_SUCCESS", response);
      })
      .catch(error => {
        context.commit("FETCH_TUTORS_FAILURE", error);
      });
    },
  }
};
