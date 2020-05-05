<template>
  <div id="Parent">
    <h4 class="my-4">Reset password</h4>
    <div>
      If you wish to reset password, please follow instructions
      <router-link :to="'/reset'">here</router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";
export default {
  name: "Tutor",
  props: ["profile"]
};
</script>