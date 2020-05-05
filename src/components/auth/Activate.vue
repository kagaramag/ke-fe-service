<template>
  <component :is="layout">
    <div class="activite">
      <Loading v-if="profile && profile.loading" />
      <h2 class="text-center pt-4">Activating account</h2>
      <div class="m-3">
        <div
          class="row"
          v-if="
        profile
        && !profile.loading
        && profile.errors
        "
        >
          <div
            class="alert alert-danger"
            v-for="error in profile.errors"
            :key="error.index"
          >{{error}}</div>
        </div>
        <div
          v-if="profile && profile.loading"
          class="my-2 p-3 text-center"
        >We are activating your account. Please wait...</div>
        <div
          v-if="profile && !profile.loading && profile.success && profile.message"
          class="alert alert-success"
          role="alert"
        >
          {{profile.message}}
          <router-link :to="'/login'">Login</router-link>&nbsp; to continue...
        </div>
      </div>
      <br />
    </div>
  </component>
</template>

<script>
import Loading from "./../commons/Loading";
import { mapActions, mapGetters } from "vuex";
const minima_layout = "minima";
export default {
  components: {
    Loading
  },
  name: "activite",
  data() {
    return {
      token: null
    };
  },
  mounted() {
    const token = this.$route.params.token;
    this.ACTIVATE_USER({ token });
    this.loaded = true;
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || minima_layout) + "-layout";
    },
    profile() {
      return this.$store.getters.profile;
    }
  },
  methods: {
    ...mapActions(["ACTIVATE_USER"])
  }
};
</script>

<style scoped>
.activite h1 {
  text-align: center;
  padding: 20px 0;
}
.activite h2 {
  text-align: center;
  font-weight: 100;
}
.activite {
  margin-bottom: 50px;
}
.alert {
  width: 100%;
}
</style>
