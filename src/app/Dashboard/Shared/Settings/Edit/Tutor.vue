<template>
  <div id="Parent">
    <h3>Tutor</h3>
    <div>Tutoring</div>
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
