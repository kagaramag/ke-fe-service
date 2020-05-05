<template>
  <div>
    <component :is="layout">
      <div class="mb-4">
        <h3 class="text-center my-3">Learners and Tutorship</h3>
        <MyKids :profile="profile" />
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import MyKids from "./MyKids";
const account_layout = "account";

export default {
  name: "DashboardParentBox",
  components: {
    MyKids
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  }
};
</script>