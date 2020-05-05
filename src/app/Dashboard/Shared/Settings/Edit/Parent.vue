<template>
  <div id="Parent">
    <h3>Parent settings</h3>
    <div>Parent</div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";
export default {
  name: "Parent",
  props: ["profile"]
};
</script>