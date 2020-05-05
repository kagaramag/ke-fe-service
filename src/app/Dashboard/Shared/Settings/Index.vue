<template>
  <div id="settings">
    <component :is="layout">
      <div class="box">
        <h2>Settings</h2>
        <div class="my-2">This page helps you to customize and configure your account the way you want.</div>
        <div class="divider bg-light my-2"></div>
        <div class="shadow-2 border bg-white rounded overflow-hidden radius-2 p-3 mb-4">
          <ProfilePicture :profile="profile"  />
        </div>
        <div class="shadow-2 border bg-white rounded overflow-hidden radius-2 p-3 mb-4">
          <ResetPassword :profile="profile" />
        </div>
        <div class="shadow-2 border bg-white rounded overflow-hidden radius-2 p-3 mb-4">
          <h4 class="my-4">Logout</h4>
          <div>
            <button @click.prevent @click="logout" class="btn btn-danger rounded px-4">Logout</button>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";

import ResetPassword from "./ResetPassword";
import UserInfo from "./UserInfo";
import ProfilePicture from "./ProfilePicture";

export default {
  name: "settings",
  components: {
    ResetPassword,
    UserInfo,
    ProfilePicture
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
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
.profile {
  width: 100%;
  margin: 0;
}
.profile .bio {
  font-weight: 100;
}

.post-link {
  border-radius: 0 !important;
  border: 5px solid #ececec;
  margin: auto 0%;
  padding: 0%;
  width: 100%;
  position: relative;
}
.post-link a {
  display: block;
}
</style>