import AxiosHelper from "@/helpers/AxiosHelper";
import router from "@/router";

export default {
  // initial state
  state: {
    auth: {
      token: localStorage.token || "",
      isAuth: localStorage.isAuth || false
    },
    profile: {
      user: {},
      errors: {},
      message: "",
      isLoggedIn: false,
      loading: false,
      success: false
    },
    fetch_user: {
      user: {},
      education: {},
      location: {},
      kids: {},
      legal: {},
      details: {},
      articles: [],
      services: [],
      errors: {},
      message: "",
      loading: false,
      success: false,
      info_updated: false,
      photo_updated: false,
      location_updated: false,
      education_updated: false,
      details_updated: false,
      service_updated: false
    },
    fetch_tutor: {
      user: {},
      education: {},
      location: {},
      kids: {},
      legal: {},
      details: {},
      articles: [],
      services: [],
      errors: {},
      message: "",
      loading: false,
      success: false,
      info_updated: false,
      photo_updated: false,
      location_updated: false,
      education_updated: false,
      details_updated: false,
      service_updated: false
    },
    edit_user: {
      user: {},
      errors: {},
      message: "",
      loading: false
    },
    fetch_tutors: {
      tutors: [],
      errors: {},
      message: "",
      loading: false,
      success: false,
      count: 0
    },
    register_user: {
      user: {},
      errors: {},
      message: "",
      loading: false,
      success: false
    }
  },
  // getters
  getters: {
    register_user(state) {
      return state.register_user;
    },
    edit_user(state) {
      state.edit_user.user = state.fetch_user.user;
    },
    profile(state) {
      return state.profile;
    },
    fetch_user(state) {
      return state.fetch_user;
    },
    fetch_tutor(state) {
      return state.fetch_tutor;
    },
    fetch_tutors(state) {
      return state.fetch_tutors;
    },
    auth(state) {
      return state.auth;
    }
  },

  // mutations
  mutations: {
    RESET_ERROR(state) {
      state.profile.errors = {};
      state.profile.success = false;
    },
    RESET_REGISTER(state) {
      state.register_user = {
        user: {},
        errors: {},
        message: "",
        loading: false,
        success: false
      };
    },
    SITE_LOADING(state, payload) {
      state.profile.loading = payload;
    },
    REGISTER_USER_LOADING(state, payload) {
      state.register_user = {
        user: {},
        errors: {},
        message: "",
        loading: true,
        success: false
      };
    },
    GET_PROFILE(state) {
      state.profile = {
        ...state.profile,
        loading: false
      };
      state.profile.user = JSON.stringify(localStorage.user);
      state.profile.isLoggedIn = JSON.parse(localStorage.isAuth);
    },
    REGISTER_USER_SUCCESS(state, payload) {
      state.register_user.user = payload.user;
      state.register_user.loading = false;
      state.register_user.success = true;
      state.register_user.errors = {};
      state.register_user.message = payload.message;
    },
    REGISTER_USER_FAILURE(state, payload) {
      state.register_user.errors = payload;
      state.register_user.loading = false;
      state.register_user.success = false;
    },
    UPDATE_USER_SUCCESS(state, payload) {
      state.profile.isLoggedIn = true;
      state.profile.loading = false;
      state.profile.user = { ...state.profile, ...payload.user };
      localStorage.user = JSON.stringify(payload.user);
      state.fetch_user.user = payload.user;
      state.fetch_user.message = payload.message;
    },
    UPDATE_LOCATION_SUCCESS(state, payload) {
      state.fetch_user.location = payload.location;
      state.fetch_user.message = payload.message;
    },
    UPDATE_LOCATION_FAILURE(state, payload) {
      state.fetch_user.message = "";
      state.fetch_user.errors = payload;
    },
    UPDATE_EDUCATION_SUCCESS(state, payload) {
      state.fetch_user.education = [
        payload.education,
        ...state.fetch_user.education
      ];
      state.fetch_user.message = payload.message;
      state.fetch_user.education_updated = true;
    },
    REQUEST_EVALUATION_SUCCESS(state, payload) {
      state.fetch_user.details = payload.details;
      state.fetch_user.message = payload.message;
      state.fetch_user.details_updated = true;
    },
    REQUEST_EVALUATION_FAILURE(state, payload) {
      state.fetch_user.message = "";
      state.fetch_user.errors = payload;
      state.fetch_user.details_updated = false;
    },
    UPDATE_EDUCATION_FAILURE(state, payload) {
      state.fetch_user.message = "";
      state.fetch_user.errors = payload;
      state.fetch_user.education_updated = false;
    },
    RESET_FETCH_USER(state) {
      state.fetch_user.errors = {};
      state.fetch_user.message = "";
      state.fetch_user.loading = false;
      state.fetch_user.success = false;
      state.fetch_user.info_updated = false;
      state.fetch_user.photo_updated = false;
      state.fetch_user.education_updated = false;
      state.fetch_user.location_updated = false;
      state.fetch_user.details_updated = false;
      state.fetch_user.service_updated = false;
    },
    LOCATION_UPDATED(state) {
      state.fetch_user.location_updated = true;
    },
    INFO_UPDATED(state) {
      state.fetch_user.info_updated = true;
    },
    PHOTO_UPDATED(state) {
      state.fetch_user.photo_updated = true;
    },
    LOGIN_USER_SUCCESS(state, payload) {
      state.profile.isLoggedIn = true;
      state.profile.loading = false;
      state.profile.success = true;
      state.profile.user = payload.user;
      localStorage.user = JSON.stringify(payload.user);
      localStorage.isAuth = true;
      localStorage.token = payload.token;
      let url;
      switch (payload.user.role) {
        case "parent":
          url = "dashboard/p";
          break;
        case "normal":
          url = "dashboard/n";
          break;
        case "learner":
          url = "dashboard/l";
          break;
        case "tutor":
          url = "dashboard/t";
          break;
        case "admin":
          url = "dashboard/a";
          break;
        default:
          url = "/";
          break;
      }
      router.push(url);
    },
    LOGIN_USER_FAILURE(state, payload) {
      state.profile.loading = false;
      state.profile.errors = payload;
    },
    ACTIVATE_USER_SUCCESS(state, payload) {
      state.profile.loading = false;
      state.profile.success = true;
      state.profile.user = {};
      state.profile.errors = {};
      state.profile.message = payload.message;
    },
    ACTIVATE_USER_FAILURE(state, payload) {
      state.profile.loading = false;
      state.profile.errors = payload;
    },
    LOGIN_USER_OUT(state) {
      state.profile = {
        user: {},
        errors: {},
        loading: false,
        message: "",
        isLoggedIn: false,
        success: false
      };
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      router.push({ path: "/login" });
    },
    UPDATE_PROFILE(state, payload) {
      state.profile = { ...state.profile, ...payload };
    },
    UPDATE_USER(state, payload) {
      state.fetch_user.user = { ...state.fetch_user.user, ...payload };
    },

    GET_PROFILE_LOADING(state, payload) {
      state.fetch_user.loading = payload;
      state.fetch_user.education = {};
      state.fetch_user.articles = {};
      state.fetch_user.location = {};
      state.fetch_user.kids = {};
      state.fetch_user.legal = {};
      state.fetch_user.success = false;
    },
    FETCH_USER_SUCCESS(state, payload) {
      state.fetch_user.loading = false;
      state.fetch_user.user = payload.user;
      state.fetch_user.education = payload.education;
      state.fetch_user.articles = payload.articles;
      state.fetch_user.location = payload.location;
      state.fetch_user.kids = payload.kids;
      state.fetch_user.legal = payload.legal;
      state.fetch_user.details = payload.details;
      state.fetch_user.services = payload.services;
      state.fetch_user.success = true;
    },
    FETCH_USER_FAILURE(state, payload) {
      state.fetch_user.errors = payload.errors;
      state.fetch_user.loading = false;
      state.fetch_user.message = {};
      state.fetch_user.user = {};
      state.fetch_user.education = {};
      state.fetch_user.articles = {};
      state.fetch_user.location = {};
      state.fetch_user.kids = {};
      state.fetch_user.legal = {};
      state.fetch_user.details = {};
      state.fetch_user.services = {};
      state.fetch_user.success = false;
    },
    FETCH_TUTOR_SUCCESS(state, payload) {
      state.fetch_tutor.loading = false;
      state.fetch_tutor.user = payload.user;
      state.fetch_tutor.education = payload.education;
      state.fetch_tutor.articles = payload.articles;
      state.fetch_tutor.location = payload.location;
      state.fetch_tutor.kids = payload.kids;
      state.fetch_tutor.legal = payload.legal;
      state.fetch_tutor.details = payload.details;
      state.fetch_tutor.services = payload.services;
      state.fetch_tutor.success = true;
    },
    FETCH_TUTOR_FAILURE(state, payload) {
      state.fetch_tutor.errors = payload.errors;
      state.fetch_tutor.loading = false;
      state.fetch_tutor.message = {};
      state.fetch_tutor.user = {};
      state.fetch_tutor.education = {};
      state.fetch_tutor.articles = {};
      state.fetch_tutor.location = {};
      state.fetch_tutor.kids = {};
      state.fetch_tutor.legal = {};
      state.fetch_tutor.details = {};
      state.fetch_tutor.services = {};
      state.fetch_tutor.success = false;
    },
    RESET_TUTORS(state) {
      state.fetch_tutors.tutors = [];
      state.fetch_tutors.count = 0;
      state.fetch_tutors.success = false;
      state.fetch_tutors.loading = true;
    },
    FETCH_TUTORS_SUCCESS(state, payload) {
      state.fetch_tutors.tutors = payload.tutors;
      state.fetch_tutors.count = payload.count;
      state.fetch_tutors.success = true;
      state.fetch_tutors.loading = false;
    },
    FETCH_TUTORS_FAILURE(state) {
      state.fetch_tutors.errors = payload.errors;
      state.fetch_tutors.success = false;
      state.fetch_tutors.loaded = false;
    },
    UPDATE_USER_FAILURE(state, payload) {
      state.fetch_user.message = "";
      state.fetch_user.errors = payload;
    },
    RESET_PASSWORD_SUCCESS(state, payload) {
      state.profile.errors = {};
      state.profile.message = payload.message;
      state.profile.loading = false;
      state.profile.success = true;
    },
    RESET_PASSWORD_FAILURE(state, payload) {
      state.profile.errors = payload.errors;
      state.profile.message = "";
      state.profile.loading = false;
      state.profile.success = false;
    }
  },

  // actions
  actions: {
    UPDATE_PROFILE: (context, payload) => {
      context.commit("UPDATE_PROFILE");
      AxiosHelper.put("/users", payload);
    },
    RESET_REGISTER: (context) => {
      context.commit('RESET_REGISTER');
    },
    RESET_PASSWORD: (context, payload) => {
      AxiosHelper.post(`/auth/request-reset`, payload)
        .then(response => {
          context.commit("FETCH_USER_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_USER_FAILURE", error.response.data);
        });
    },

    CONFIRM_PASSWORD: (context, payload) => {
      AxiosHelper.patch(`/auth/reset/${payload.redirect}`, {
        password: payload.password
      })
        .then(response => {
          context.commit("RESET_PASSWORD_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("RESET_PASSWORD_FAILURE", error.response.data);
        });
    },

    UPDATE_USER: (context, payload) => {
      context.commit("SITE_LOADING", true);
      AxiosHelper.put("/users", payload)
        .then(response => {
          context.commit("UPDATE_USER_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_USER_FAILURE", error.response.data);
        });
    },

    UPDATE_PROFILE: (context, payload) => {
      context.commit("UPDATE_PROFILE");
      AxiosHelper.put("/users", payload)
        .then(response => {
          context.commit("INFO_UPDATED");
          context.commit("UPDATE_USER_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("UPDATE_USER_FAILURE", error.response.data);
        });
    },
    UPDATE_USER_LOCATION: (context, payload) => {
      context.commit("UPDATE_PROFILE");
      AxiosHelper.post("/location", payload)
        .then(response => {
          context.commit("LOCATION_UPDATED");
          context.commit("UPDATE_LOCATION_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("UPDATE_LOCATION_FAILURE", error.response.data);
        });
    },
    UPDATE_USER_EDUCATION: (context, payload) => {
      context.commit("UPDATE_PROFILE");
      AxiosHelper.post("/education", payload)
        .then(response => {
          context.commit("UPDATE_EDUCATION_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("UPDATE_EDUCATION_FAILURE", error.response.data);
        });
    },
    REQUEST_EVALUATION: context => {
      context.commit("UPDATE_PROFILE");
      AxiosHelper.put("/users/request-evaluation")
        .then(response => {
          context.commit("REQUEST_EVALUATION_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("REQUEST_EVALUATION_FAILURE", error.response.data);
        });
    },
    RESET_FETCH_USER: (context, payload) => {
      context.commit("RESET_FETCH_USER");
    },
    UPDATE_PHOTO: (context, payload) => {
      AxiosHelper.post("/upload/profile", payload)
        .then(response => {
          context.commit("PHOTO_UPDATED");
          context.commit("UPDATE_USER_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_USER_FAILURE", error.response.data);
        });
    },

    GET_PROFILE: context => {
      context.commit("GET_PROFILE");
    },
    FETCH_USER: (context, payload) => {
      context.commit("SITE_LOADING", false);
      context.commit("GET_PROFILE_LOADING", true);
      AxiosHelper.get(`/users/username/${payload}`)
        .then(response => {
          context.commit("FETCH_USER_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_USER_FAILURE", error.response.data);
        });
    },
    FETCH_TUTOR: (context, payload) => {
      context.commit("SITE_LOADING", false);
      context.commit("GET_PROFILE_LOADING", true);
      AxiosHelper.get(`/users/username/${payload}`)
        .then(response => {
          context.commit("FETCH_TUTOR_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_TUTOR_FAILURE", error.response.data);
        });
    },
    REGISTER_USER: (context, payload) => {
      context.commit("REGISTER_USER_LOADING");
      AxiosHelper.post("/auth/signup", payload)
        .then(response =>
          context.commit("REGISTER_USER_SUCCESS", response.data)
        )
        .catch(error => {
          context.commit("REGISTER_USER_FAILURE", error.response.data.errors);
        });
    },
    LOGIN_USER: (context, payload) => {
      context.commit("RESET_ERROR");
      context.commit("SITE_LOADING", true);
      AxiosHelper.post("/auth/login", payload)
        .then(response => context.commit("LOGIN_USER_SUCCESS", response.data))
        .catch(error =>
          context.commit("LOGIN_USER_FAILURE", error.response.data.errors)
        );
    },
    ACTIVATE_USER: (context, payload) => {
      context.commit("RESET_ERROR");
      context.commit("SITE_LOADING", true);
      AxiosHelper.post("/auth/activate", payload)
        .then(response =>
          context.commit("ACTIVATE_USER_SUCCESS", response.data)
        )
        .catch(error =>
          context.commit("ACTIVATE_USER_FAILURE", error.response.data.errors)
        );
    },
    LOGOUT_USER: context => {
      context.commit("LOGIN_USER_OUT");
    },
    FETCH_TUTORS: (context, payload) => {
      context.commit("RESET_TUTORS");
      AxiosHelper.get(
        `/users/tutors?limit=${payload.limit}&offset=${payload.offset}`
      )
        .then(response => {
          context.commit("FETCH_TUTORS_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_TUTORS_FAILURE", error.response.data);
        });
    }
  }
};
