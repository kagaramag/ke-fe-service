<template>
  <component :is="layout">
    <div class="login">
      <Loading v-if="profile.loading" />
      <h2 class="text-center pt-4">Reset password</h2>
      <div class="box" v-if="!confirmed">
        <form class="p-4">
          <div class="row" v-if="profile && profile.errors">
            <div
              class="alert alert-danger"
              v-for="error in profile.errors[0]"
              :key="error.index"
            >{{error}}</div>
          </div>
          <div
            class="my-2"
          >Enter your account email address and we will send you a link to reset your password.</div>
          <div class="form-group">
            <label for="email">Your email</label>
            <input
              type="email"
              class="form-control"
              v-model="user.email"
              id="email"
              autocomplete="off"
            />
          </div>
          <div class="text-center">
            <button
              :disabled="!validateReset"
              type="submit"
              @click.prevent
              @click="reset"
              class="btn btn-primary rounded border border-primary px-5"
            >Request Password Reset</button>
          </div>
          <div class="col text-center">
            <br />Remember your password?
            <router-link :to="'/login'">Login</router-link>
          </div>
        </form>
      </div>
      <br />
      <div class="text-center">
        Go back
        <router-link :to="'/'" class="p-1">home</router-link>
      </div>
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
  name: "login",
  data() {
    return {
      redirect: "",
      confirmed: false,
      spinning: true,
      done: false,
      message: null,
      password: "",
      confirmpassword: "",
      user: {
        email: ""
      }
    };
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || minima_layout) + "-layout";
    },
    profile() {
      return this.$store.getters.profile;
    },
    validateReset() {
      if (!this.user.email) {
        return false;
      }
      return true;
    }
  },

  methods: {
    reset() {
      this.spinning = false;
      this.$store.dispatch("RESET_PASSWORD", this.user);
      setTimeout(() => {
        this.confirmed = true;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.login h1 {
  text-align: center;
  padding: 20px 0;
}
.login h2 {
  text-align: center;
  font-weight: 100;
}
.login {
  margin-bottom: 50px;
}
.alert {
  width: 100%;
}
</style>
