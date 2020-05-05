<template>
  <div id="Parent">
    <div class="mb-1 shadow-sm bg-white p-3 top-border-styled wrap-one-tutering">
      <div v-if="tutoring.status ==='requested'" style="font-size: 18px">
        <div v-if="profile.user.role ==='parent'">
          <b>You</b> requested <b>
            <router-link :to="`/profile/${tutoring.tutor.username}`">
            {{tutoring.tutor.firstName}} {{tutoring.tutor.lastName}}
            </router-link>
            </b> to tutor your kid 
          <b>{{tutoring.kid.names}}</b>
        </div>
        <div v-if="profile.user.role ==='tutor'">
          <router-link :to="`/`">
            <b>{{tutoring.kid.parent.lastName}} {{tutoring.kid.parent.firstName}}</b>
          </router-link>&nbsp; requested you to tutor
          <b>{{tutoring.kid.names}}</b>
          , his/her {{tutoring.kid.age}}-years old child who is studying in
          <b>{{tutoring.kid.school}}</b>
          specifically in {{tutoring.kid.class}}
        </div>
      </div>

      <div v-if="tutoring.status ==='accepted'">
        You are connected with
        <router-link :to="`/`">
          <b>{{tutoring.kid.names}}</b>
        </router-link>
      </div>

      <div class="row">
        <div class="col-9">
          <h4 class="my-2" style="font-size: 18px;font-weight:200">
            <span class="py-3">Tutorship</span>
            <span
              v-show="tutoring.status === 'requested'"
              class="border border-dark text-dark sm-text text-light radius-4 px-3 py-1"
            >Pending</span>
            <span
              v-show="tutoring.status === 'accepted'"
              class="border border-dark text-dark sm-text text-light radius-4 px-3 py-1"
            >Ongoing</span>
            <span
              v-show="tutoring.status === 'rejected'"
              class="border border-dark text-dark sm-text text-light radius-4 px-3 py-1"
            >Cancelled</span>
          </h4>
        </div>
        <div class="col-3">
          <div class="dropdown option-nav p-0 m-0 d-none">
            <b-dropdown id="option-nav" no-caret right class="p-0 m-0" variant="outline-light">
              <template class="btn" v-slot:button-content>
                <span class="text-dark">Actions</span>
              </template>
              <b-dropdown-item @click="popKidInfo(kid)">
                <icon class="icon" icon="child" />&nbsp; Cancel tutorship
              </b-dropdown-item>
              <b-dropdown-item @click="popUserForm(kid)" class="text-danger">
                <icon class="icon" icon="pen" />&nbsp; Terminate
              </b-dropdown-item>
              <b-dropdown-item @click="popToDeleteKid(kid.id, kid.names)" class="text-danger">
                <icon class="icon" icon="trash" />&nbsp; Request to cancel
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";
export default {
  name: "Tutor",
  props: ["tutoring", "profile"],
  computed: {
    tutoring() {
      return this.$store.getters.fetch_one_tutoring.tutoring;
    },
    ...mapGetters(["fetch_one_tutoring"])
  }
};
</script>

<style scoped>
</style>
