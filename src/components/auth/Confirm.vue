<template>
  <component :is="layout">
    <div class="register">
      <Loading v-if="profile && profile.loading  && !profile.success" />
      <div class="box">
        <form class="p-4">
          <div class="row" v-if="profile && profile.errors">
            <div
              class="alert alert-danger m-3"
              v-for="error in profile.errors"
              :key="error.index"
            >{{error}}</div>
          </div>
          <div class="row" v-if="profile && profile.message">
            <div
              class="alert alert-success m-3"
            >{{profile.message}}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              v-model.trim="$v.user.password.$model"
              autocomplete="off"
              id="password"
            />
            <div class="error py-2" v-if="!$v.user.password.required">Password is required</div>
            <div
              class="error py-2"
              v-if="!$v.user.password.minLength"
            >Password must be at least {{$v.user.password.$params.minLength.min}} characters.</div>
            <div
              class="error py-2"
              v-if="!$v.user.password.maxLength"
            >Password must be at least {{$v.user.password.$params.maxLength.min}} characters.</div>
          </div>

          <div class="form-group">
            <label for="password">Confirm password</label>
            <input
              type="password"
              class="form-control"
              v-model.trim="$v.user.confirmpassword.$model"
              autocomplete="off"
              id="password"
            />
          </div>
          <div
            class="error py-2"
            v-if="!$v.user.confirmpassword.sameAsPassword"
          >Password your typed do not match.</div>
          <div class="text-center">
            <button
              type="submit"
              @click.prevent
              @click="reset"
              class="btn btn-primary rounded border border-primary px-5"
            >Confirm &amp; Save</button>
          </div>
        </form>
      </div>
      <div class="text-center">
        Go back
        <router-link :to="'/'" class="p-1">Home</router-link>
      </div>
    </div>
  </component>
</template>

<script>
import Vue from "vue";
import Loading from "./../commons/Loading";
import { mapActions, mapGetters } from "vuex";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
const { validationMixin, default: Vuelidate } = require("vuelidate");
Vue.use(Vuelidate);

const minima_layout = "minima";
export default {
  components: {
    Loading
  },
  name: "register",
  data() {
    return {
      user: {
        password: "",
        confirmpassword: "",
        error: ""
      },
      token: null
    };
  },
  mounted() {
    this.token = this.$route.params.token;
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
    reset() {
      if (
        this.user.password !== "" &&
        this.user.password === this.user.confirmpassword
      ) {
        const data = {
          redirect: this.token,
          password: this.user.password
        };
        this.CONFIRM_PASSWORD(data);
      } else {
        this.user.error = "Password does not match";
      }
    },
    ...mapActions(["CONFIRM_PASSWORD"])
  },
  // validation
  validations: {
    user: {
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(22)
      },
      confirmpassword: {
        sameAsPassword: sameAs("password")
      }
    }
  }
};
</script>

<style scoped>
.register h1 {
  text-align: center;
  padding: 20px 0;
}
.register h2 {
  text-align: center;
  font-weight: 100;
}
.register {
  margin-bottom: 50px;
}
.alert {
  width: 100%;
}
</style>
