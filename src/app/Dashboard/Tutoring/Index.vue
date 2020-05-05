<template>
  <div id="tutoring">
    <component :is="layout">
        <MyTutees v-if="isTutor" :profile="profile" />
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import MyTutees from "./MyTutees";

const account_layout = "account";

export default {
  name: "tutoring",
  components: {
    MyTutees,
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
    register_kid() {
      return this.$store.getters.register_kid;
    },
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    },
    isParent() {
      return this.profile.user.role === "parent" ? true : false;
    },
    isTutor() {
      return this.profile.user.role === "tutor" ? true : false;
    }
  },
};
</script>
