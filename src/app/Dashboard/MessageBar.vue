
<template>
  <div id="profile-card" slot-scope="fetch_user">
    <div class="bg-light" style="margin:76px 0 25px 0;padding:0px 0 0 0!important">
      <div
        v-if="profile.isLoggedIn && fetch_user.user.id === profile.user.id && fetch_user.user.UserRole.role.role === 'tutor'"
        class="gradient-primary p-3"
      >
        <div class="container">
          <h4 class="text-light text-center m-0 p-0">
            Complete your account profile and get hired
            <router-link
              class="btn btn-primary shadow-3"
              :to="`/`"
            >Learn more</router-link>
          </h4>
        </div>
      </div>
      <div
        v-if="profile.isLoggedIn && fetch_user.user.id === profile.user.id && fetch_user.user.UserRole.role.role === 'parent'"
        class="gradient-primary p-3"
      >
        <div class="container">
          <h4 class="text-light text-center m-0 p-0">
            Complete your account and find the right tutor for your kids near you.
            <router-link
              class="btn btn-primary shadow-3"
              :to="`/tutors`"
            >Search tutors</router-link>
            <router-link
              class="btn btn-light text-dark shadow-3"
              :to="`/profile/${profile.user.username}/edit`"
            >Edit Profile</router-link>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MessageBar",
  props: ["teachers", "fetch_user", "profile"],
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    logout() {
      this.LOGOUT_USER();
    },
    ...mapActions(["LOGOUT_USER"])
  }
};
</script>


<style scoped>
.content-wrapper {
  margin: 0px auto;
  display: block;
  max-width: 1100px;
}
.bio {
  font-weight: 100;
  font-size: 18px;
  color: #565656;
}
.loaded {
  display: none;
}
.nav .icon {
  margin-right: 5px;
}
.nav .nav-link {
  color: #81828b;
  font-weight: 100;
}
.nav .nav-link.active {
  color: #484a52;
  font-weight: 600;
}
.tabs-alt.nav-tabs .nav-link.active,
.tabs-alt.nav-tabs .nav-link.active:hover,
.tabs-alt.nav-tabs .nav-link.active:focus,
.tabs-alt > .nav-tabs .nav-link.active,
.tabs-alt > .nav-tabs .nav-link.active:hover,
.tabs-alt > .nav-tabs .nav-link.active:focus {
  -webkit-box-shadow: 0 -2px 0 #26b4ff inset;
  box-shadow: 0 -2px 0 #26b4ff inset;
}

.nav-tabs:not(.nav-fill):not(.nav-justified) .nav-link,
.nav-pills:not(.nav-fill):not(.nav-justified) .nav-link {
  margin-right: 0.125rem;
}
.nav-tabs.tabs-alt .nav-link,
.tabs-alt > .nav-tabs .nav-link {
  border-width: 0 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}
.nav-tabs .nav-link.active {
  border-bottom-color: #fff;
}
</style>
