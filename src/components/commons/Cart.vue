<template v-if="auth">
  <div v-if="fetch_cart && fetch_cart.length" class="grab-cart-bar">
    <div class="card bg-blue-gradient border-0 mb-3 text-light radius-1">
      <div class="row no-gutters">
        <div class="col-md-9">
          <div class="card-body">
            <h2 class="font-weight-light text-gray">Hiring</h2>
            <h5 class="card-title font-weight-light ">One more step...</h5>
            <p class="card-text py-3 font-weight-light">
              In order to hire
              <router-link class="bold text-light" :to="`/@${fetch_cart[0].username}`">{{fetch_cart[0].name}}</router-link>, you’ll need to complete one more step
            </p>
            <p class="card-text">
              <router-link
                class="btn btn-light px-4 rounded"
                :to="`/dashboard/${accountType}/hiring/${fetch_cart[0].username}`"
              >Complete hiring</router-link>
              <router-link
                class="btn btn-danger px-4 rounded"
                :to="`/dashboard/${accountType}/hiring/${fetch_cart[0].username}`"
              >Cancel</router-link>
            </p>
          </div>
        </div>
        <div class="col-md-3">
          <img src="../../assets/images/hello-hire.svg" class="card-img" alt="hiring" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Cart",
  mounted() {
    this.FETCH_CART();
    this.loaded = true;
  },
  computed: {
    auth() {
      return JSON.parse(localStorage.getItem("auth")) || null;
    },
    fetch_cart() {
      return this.$store.getters.fetch_cart;
    },
    ...mapGetters(["fetch_cart"])
  },
  methods: {
    ...mapActions(["FETCH_CART"])
  }
};
</script>

<style scoped>
.grab-cart-bar {
  position: relative;
  top: 0;
  left: 0;
  margin: 10px 3%;
  width: 94%;
}
</style>