<template>
  <div id="ProfileEdit">
    <component :is="layout">
      <div class="profile p-3 mb-4">
        <h2>Profile</h2>
        <UserInfo :profile="profile" />

        <div v-if="profile.user.role==='parent'">
          <!-- <Parent :profile="profile" /> -->
          <div class="divider my-4" />
        </div>

        <div v-if="profile.user.role==='tutor'">
          <!-- <Tutor :profile="profile" /> -->
          <div class="divider my-4" />
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";

import UserInfo from "./UserInfo";
import Parent from "./Parent";
import Tutor from "./Tutor";

export default {
  name: "ProfileEdit",
  props: ["data"],
  components: {
    UserInfo,
    Parent,
    Tutor
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    },
    profile() {
      return this.$store.getters.profile;
    },
    ...mapGetters(["profile"])
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