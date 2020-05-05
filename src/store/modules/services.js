import AxiosHelper from "@/helpers/AxiosHelper";
import store from "@/store";
import router from "@/router";

export default {
  // initial state
  state: {
    fetch_service: {
      service: {},
      errors: {},
      message: "",
      loading: false,
      success: false
    },
    fetch_services: {
      services: [],
      errors: {},
      message: "",
      loading: false,
      success: false,
      count: 0
    }
  },
  // getters
  getters: {
    fetch_services(state) {
      return state.fetch_services;
    },
    fetch_service(state) {
      return state.fetch_service;
    }
  },

  // mutations
  mutations: {
    RESET_SERVICE(state) {
      state.fetch_service.service = {};
      state.fetch_service.errors = {};
      state.fetch_service.message = "";
      state.fetch_service.loading = false;
      state.fetch_service.success = false;
    },
    FETCH_SERVICE_SUCCESS(state, payload) {
      state.fetch_service.service = payload.service;
      state.fetch_service.errors = {};
      state.fetch_service.message = payload.message;
      state.fetch_service.loading = false;
      state.fetch_service.success = true;
    },
    FETCH_SERVICE_FAILURE(state, payload) {
      state.fetch_service.service = {};
      state.fetch_service.errors = payload.data;
      state.fetch_service.message = payload.message;
      state.fetch_service.loading = false;
      state.fetch_service.success = true;
    },
    FETCH_SERVICES_SUCCESS(state, payload) {
      state.fetch_services.services = payload.services;
      state.fetch_services.errors = {};
      state.fetch_services.message = payload.message;
      state.fetch_services.loading = false;
      state.fetch_services.success = true;
    },
    FETCH_SERVICES_FAILURE(state, payload) {
      state.fetch_services.service = {};
      state.fetch_services.errors = payload.data;
      state.fetch_services.message = payload.message;
      state.fetch_services.loading = false;
      state.fetch_services.success = true;
    }
  },

  // actions
  actions: {
    CREATE_SERVICE: (context, payload) => {
      context.commit("RESET_SERVICE");
      AxiosHelper.post("/services", payload)
        .then(response =>
          context.commit("FETCH_SERVICE_SUCCESS", response.data)
        )
        .catch(error => {
          context.commit("FETCH_SERVICE_FAILURE", error.response.data.errors);
        });
    },
    FETCH_SERVICE: (context, payload) => {
      context.commit("SERVICE_RESET");
      AxiosHelper.get(`/services/${payload}`)
        .then(response => {
          context.commit("FETCH_SERVICE_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_SERVICE_FAILURE", error.response.data);
        });
    },
    FETCH_SERVICES: (context, payload) => {
      AxiosHelper.get("/services")
        .then(response => {
          context.commit("FETCH_SERVICES_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_SERVICES_FAILURE", error.response.data);
        });
    }
  }
};
