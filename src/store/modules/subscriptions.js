import AxiosHelper from "@/helpers/AxiosHelper";

export default {
  // initial state
  state: {
    fetch_subscription: {
      subscription: {},
      errors: {},
      message: "",
      loading: false,
      success: false
    },
    fetch_subscriptions: {
      subscriptions: [],
      errors: {},
      message: "",
      loading: false,
      success: false,
      count: 0
    }
  },
  // getters
  getters: {
    fetch_subscriptions(state) {
      return state.fetch_subscriptions;
    },
    fetch_subscription(state) {
      return state.fetch_subscription;
    }
  },

  // mutations
  mutations: {
    RESET_SUBSCRIPTION(state) {
      state.fetch_subscription.subscription = {};
      state.fetch_subscription.errors = {};
      state.fetch_subscription.message = "";
      state.fetch_subscription.loading = false;
      state.fetch_subscription.success = false;
    },
    FETCH_SUBSCRIPTION_SUCCESS(state, payload) {
      state.fetch_subscription.subscription = payload.subscription;
      state.fetch_subscription.errors = {};
      state.fetch_subscription.message = payload.message;
      state.fetch_subscription.loading = false;
      state.fetch_subscription.success = true;
    },
    FETCH_SUBSCRIPTION_FAILURE(state, payload) {
      state.fetch_subscription.subscription = {};
      state.fetch_subscription.errors = payload.data;
      state.fetch_subscription.message = payload.message;
      state.fetch_subscription.loading = false;
      state.fetch_subscription.success = true;
    },
    FETCH_SUBSCRIPTIONS_SUCCESS(state, payload) {
      state.fetch_subscriptions.subscriptions = payload.subscriptions;
      state.fetch_subscriptions.errors = {};
      state.fetch_subscriptions.message = payload.message;
      state.fetch_subscriptions.loading = false;
      state.fetch_subscriptions.success = true;
    },
    FETCH_SUBSCRIPTIONS_FAILURE(state, payload) {
      state.fetch_subscriptions.subscription = [];
      state.fetch_subscriptions.errors = payload.errors;
      state.fetch_subscriptions.message = payload.message;
      state.fetch_subscriptions.loading = false;
      state.fetch_subscriptions.success = false;
    }
  },

  // actions
  actions: {
    fetchSubscription: (context, payload) => {
      context.commit("SUBSCRIPTION_RESET");
      AxiosHelper.get(`/subscriptions/${payload}`)
        .then(response => {
          context.commit("FETCH_SUBSCRIPTION_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_SUBSCRIPTION_FAILURE", error.response.data);
        });
    },
    fetchSubscriptions: (context, payload) => {
      AxiosHelper.get("/subscriptions")
        .then(response => {
          context.commit("FETCH_SUBSCRIPTIONS_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_SUBSCRIPTIONS_FAILURE", error.response.data);
        });
    }
  }
};
