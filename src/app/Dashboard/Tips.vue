<template>
  <div id="Tips">
    <!-- HOW TO HIRE ME -->
    <div
      v-if="
        profile.isLoggedIn
        && profile.user.role === 'parent'
        && profile.user.id === fetch_user.user.id
        "
      class="alert alert-success"
      role="alert"
    >
      <h4 class="alert-heading">How to hire a tutor?</h4>
      <p>
        Aww yeah, we understand that your children deserve the best tutors. We have made it easy for you to find the most competent tutors wherever you are.
        For more information,
        <router-link :to="`/`">Check here</router-link>the process and criteria to admin tutors on our website and
        <router-link :to="`/`">here</router-link>for tips to hire a tutor you really need.
      </p>
      <hr />
      <div>
        <router-link
          :to="`/`/tutors"
          class="btn btn-light border border-success roundedfloat-right"
        >Find Tutor</router-link>
      </div>
      <div class="clear"></div>
    </div>
    <!-- COMPLETE PROFILE -->
    <div
      v-if="
        profile.isLoggedIn
        && profile.user.role === 'tutor'
        && profile.user.id === fetch_user.user.id
        "
    >
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Complete your profile</h4>
        <p>Aww yeah, we understand that your children deserve the best tutors. We have made it easy for you to find the most competent tutors wherever you are.</p>
        <hr />
        <div>
          <router-link
            class="btn btn-light border border-success rounded"
            :to="`/profile/${profile.user.username}/edit`"
          >Go to Profile</router-link>
        </div>
        <div class="clear"></div>
      </div>
      <br />
      <div class="divider mb-4"></div>
    </div>

    <!-- BIO -->
    <div class="alert mb-3 p-0" role="alert">
      <h4 class="alert-heading">Bio</h4>
      <div v-if="fetch_user" v-html="fetch_user.user.bio || 'No bio yet'"></div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";
export default {
  name: "Tips",
  props: ["profile", "fetch_user"]
};
</script>