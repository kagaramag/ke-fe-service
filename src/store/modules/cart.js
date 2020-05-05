import router from "@/router";

export default {
  state: {
    fetch_cart: {
      cart: []
    }
  },
  getters: {
    fetch_cart(state) {
      return state.fetch_cart;
    }
  },

  mutations: {
    SET_CART(state, payload) {
      let data = [payload];
      localStorage.setItem("cart", JSON.stringify(data));
      state.fetch_cart = JSON.parse(localStorage.getItem("cart"));
      router.push(`/dashboard/p/hiring/${payload.username}`);
    },
    FETCH_CART(state) {
      state.fetch_cart = JSON.parse(localStorage.getItem("cart"));
    }
  },
  actions: {
    ADD_TO_CART: (context, payload) => {
      context.commit("SET_CART", payload);
    },
    FETCH_CART: context => {
      context.commit("FETCH_CART");
    }
  }
};
