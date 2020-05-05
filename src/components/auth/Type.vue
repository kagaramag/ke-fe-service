<template>
  <component :is="layout">
    <div class="account-type">
      <div v-if="!auth">
        <h2 class="text-center pt-4">I am...</h2>
        <div class="box">
          <div class="row mx-2">
            <div class="col col-sm-12 col-md-12 col-lg-12 my-2">
              <router-link :to="'register/tutor'">
                <div class="p-2 type-card">
                  <h3 class="text-dark">Tutor</h3>
                  <div class="text-dark">Find kids easily around you</div>
                </div>
              </router-link>
            </div>
            <div class="col col-sm-12 col-md-12 col-lg-12 my-2">
              <router-link :to="'register/parent'">
                <div class="p-2 type-card">
                  <h3 class="text-dark">Parent</h3>
                  <div class="text-dark">You can find a trusted tutor for your kids</div>
                </div>
              </router-link>
            </div>
          </div>
          <br />
          <div class="col text-center">
            Already have account?
            <router-link :to="'login'">Login</router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center my-5">
          You are already logged in.
          <br />
          <router-link :to="`/dashboard/${accountType}`">Click here</router-link>&nbsp; to go to dashboard
        </div>
      </div>
    </div>
  </component>
</template>

<script>
const minima_layout = "minima";
export default {
  name: "register",
  data() {
    return {
      accountType: "",
      user: {
        lastName: "",
        firstName: "",
        email: "",
        password: ""
      }
    };
  },
  computed: {
    auth() {
      return JSON.parse(localStorage.getItem("isAuth"));
    },
    layout() {
      return (this.$route.meta.layout || minima_layout) + "-layout";
    }
  }
};
</script>

<style scoped>
.account-type h1 {
  text-align: center;
  padding: 20px 0;
}
.account-type h2 {
  text-align: center;
  /* font-weight: 100!important; */
}
.account-type {
  margin-bottom: 50px;
}
.alert {
  width: 100%;
}
.type-card {
  border: 1px solid #dfdfdf;
  border-radius: 3px !important;
  background: #ffffff;
  cursor: pointer;
}
.is-selected {
  border: 1px solid #989898;
  background: #304894;
  color: #ffffff;
}
</style>
