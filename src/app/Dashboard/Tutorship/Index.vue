<template>
  <div id="tutorship">
    <component :is="layout">
        <DetailsTutor :tutoring="fetch_one_tutoring" :profile="profile" />
        <Compose :profile="profile" :tutoring="fetch_one_tutoring" />
        <Thread :profile="profile"  />
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import DetailsTutor from "./DetailsTutor";
import Compose from "./Compose";
import Thread from "./Thread";

const account_layout = "account";


export default {
  name: "tutorship",
  components: {
    DetailsTutor,
    Compose,
    Thread
  },
  mounted() {
    this.FETCH_TUTORING_DETAILS(this.$route.params.id);
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    },
    profile() {
      return this.$store.getters.profile;
    },
    fetch_one_tutoring() {
      return this.$store.getters.fetch_one_tutoring;
    },
    isParent() {
      return this.profile.user.role === "parent" ? true : false;
    },
    isTutor() {
      return this.profile.user.role === "tutor" ? true : false;
    }
  },
  methods: {
    ...mapActions(["FETCH_TUTORING_DETAILS"])
  }
};
</script>
