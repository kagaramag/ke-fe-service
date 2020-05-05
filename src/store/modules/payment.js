import AxiosHelper from "@/helpers/AxiosHelper";

export default {
  state: {
    getPayment: {
      payment: {},
      loading: false,
      success: false,
      message: "",
      errors: []
    }
  },
  getters: {
    getPayment(state) {
      return state.getPayment;
    }
  },

  mutations: {
    PROCESS_PAYMENT_INITIATE(state) {
      state.getPayment.payment = {};
      state.getPayment.loading = true;
      state.getPayment.success = false;
      state.getPayment.message = "";
      state.getPayment.errors = {};
    },
    PROCESS_PAYMENT_SUCCESS(state, payload) {
      state.getPayment.payment = {};
      state.getPayment.loading = false;
      state.getPayment.success = true;
      state.getPayment.message = payload.message;
      state.getPayment.errors = {};
      state.fetch_cart = JSON.parse(localStorage.getItem("cart"));
    },
    PROCESS_PAYMENT_FAILURE(state, payload) {
      state.getPayment.payment = {};
      state.getPayment.loading = false;
      state.getPayment.success = false;
      state.getPayment.message = "";
      state.getPayment.errors = payload.errors;
    }
  },
  actions: {
    PROCESS_PAYMENT: (context, payload) => {
      context.commit("PROCESS_PAYMENT_INITIATE");
      AxiosHelper.post("/payments/pay", payload)
        .then(response => {
          context.commit("PROCESS_PAYMENT_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("PROCESS_PAYMENT_FAILURE", error.response.data);
        });
    }
  }
};
