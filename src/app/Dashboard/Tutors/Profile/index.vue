<template>
  <div>
    <component :is="layout">
      <div v-if="loaded">
        <div v-if="loaded" class="content-wrapper mt-2 mb-2">
          <!-- BOX HEADER -->
          <div class="row">
            <div class="col-sm-12 col-md-3 col-lg-3">
              <div class="col-sm-12 col-md-12 col-lg-12 p-0 m-0" v-on:click="goTo('zero')">
                <div :class="{ 'active': steps.zero }" class="profile-nav-box">
                  <img src="@/assets/images/profile-welcome.svg" alt="Profile" />
                  Welcome
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-12 p-0 m-0" v-on:click="goTo('one')">
                <div
                  :class="{ 'active': steps.one }"
                  class="profile-nav-box isNotOkay"
                >
                  <img src="@/assets/images/profile-information.svg" alt="Profile" />
                  Profile
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-12 p-0 m-0" v-on:click="goTo('two')">
                <div
                  :class="{ 'active': steps.two }"
                  class="profile-nav-box isNotOkay"
                >
                  <img src="@/assets/images/profile-location.svg" alt="Profile" />
                  Location
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-12 p-0 m-0" v-on:click="goTo('three')">
                <div
                  :class="{ 'active': steps.three }"
                  class="profile-nav-box isNotOkay"
                >
                  <img src="@/assets/images/profile-education.svg" alt="Profile" />
                  Education
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-12 p-0 m-0" v-on:click="goTo('four')">
                <div
                  :class="{ 'active': steps.four }"
                  class="profile-nav-box isNotOkay"
                >
                  <img src="@/assets/images/profile-documents.svg" alt="Profile" />
                  Documents
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-12 p-0 m-0" v-on:click="goTo('five')">
                <div
                  :class="{ 'active': steps.five }"
                  class="profile-nav-box isNotOkay"
                >
                  <img src="@/assets/images/profile-blog.svg" alt="Profile" />
                  Articles
                </div>
              </div>
              <div
                class="col-sm-12 col-md-12 col-lg-12 p-0 m-0"
                v-on:click="goTo('six')"
              >
                <div
                  :class="{ 'active': steps.six  }"
                  class="profile-nav-box isOkay"
                >
                  <img src="@/assets/images/profile-submit.svg" alt="Profile" />
                  Done
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-9 col-lg-9">
              <div class="content-steps">
                <!-- STEP ZERO: WELCOME -->
                <div v-if="steps.zero">
                  <div class="p-3 bg-white border border-gray mb-3 shadow-1 radius-2">
                    <h1 class="text-center">Build your profile</h1>
                    <div class="image">
                      <img
                        style="max-width:400px;display:block;margin: 15px auto;"
                        src="@/assets/images/build_profile.svg"
                        alt="Build profile"
                      />
                    </div>
                    <div class="text-center my-4">
                      Complete the profile information carefully.
                      <br />We require above information so that we can match you with child around you
                    </div>
                    <div class="mt-1 mb-4 text-center">
                      <router-link class="btn btn-secondary radius-1" :to="'/'">Learn more</router-link>
                    </div>
                  </div>
                </div>
                <!-- STEP ONE: PROFILE -->
                <div v-if="steps.one">
                  <div class="p-3 bg-white border border-gray mb-3 shadow-1 radius-2">
                    <UserInfo :profile="fetch_user.user" />
                  </div>
                  <div class="p-3 bg-white border border-gray mb-3 shadow-1 radius-2">
                    <ProfilePicture :profile="profile" />
                  </div>
                </div>
                <!-- STEP TWO: LOCATION -->
                <div v-if="steps.two">
                  <div class="p-3 bg-white border border-gray mb-3 shadow-1 radius-2">
                    <h4>My Location</h4>
                    <Location :location="fetch_user && fetch_user.location" />
                  </div>
                </div>
                <!-- STEP THREE: EDUCATION -->
                <div v-if="steps.three">
                  <div class="p-3 bg-white border border-gray mb-3 shadow-1 radius-2">
                    <h4>My education</h4>
                    <Education :education="(fetch_user && fetch_user.education) || []" />
                  </div>
                </div>
                <!-- STEP FOUR: LEGAL -->
                <div v-if="steps.four">
                  <div class="p-3 bg-white border border-gray mb-3 shadow-1 radius-2">
                    <h4>My Documents</h4>
                    <div class="nobold">For you to be accepted as a tutor you will have to submit the specified documents below</div>
                    <Legal :legal="fetch_user.legal" />
                  </div>
                </div>
                <!-- STEP FIVE: BLOG -->
                <div v-if="steps.five">
                  <div
                    class="p-3 border border-gray mb-3 shadow-1 radius-2"
                    v-if="fetch_user && fetch_user.articles.length"
                  >
                    <h4>Articles</h4>
                    <div class="text-center my-4">
                      Complete the profile information carefully.
                      <br />We require above information so that we can match you with child around you
                    </div>
                    <div>
                      <img
                        style="max-width:400px;display:block;margin: 15px auto;"
                        src="@/assets/images/profile-blogging.svg"
                        alt="Build profile"
                      />
                    </div>
                    <div class="mt-1 mb-4 text-center">
                      <router-link
                        class="btn btn-primary radius-1"
                        :to="`/dashboard/t/my-blog`"
                      >Go to my articles</router-link>
                      <router-link
                        class="btn btn-light text-primary border border-primary radius-1"
                        :to="`/dashboard/t/my-blog/compose`"
                      >
                        <icon class="icon" icon="plus" />&nbsp;New article
                      </router-link>
                    </div>
                  </div>
                  <div class="p-3 border text-center border-gray mb-3 shadow-1 radius-2" v-else>
                    <h4>No articles found</h4>
                    <div
                      class="my-4"
                    >Our application requires to have written at least one article in the blog.</div>
                    <div>
                      <img
                        style="max-width:350px;display:block;margin: 15px auto;"
                        src="@/assets/images/no-article-found.svg"
                        alt="Build profile"
                      />
                    </div>
                    <div class="mt-1 mb-4 ">
                      <router-link
                        class="btn btn-danger radius-1"
                        :to="`/dashboard/t/my-blog/compose`"
                      >
                        <icon class="icon" icon="plus" /> &nbsp; Write now
                      </router-link>
                    </div>
                    or
                    <div class="mt-1 mb-4 ">
                      <router-link
                        class="btn btn-secondary radius-1"
                        :to="`/dashboard/t/my-blog`"
                      >
                        <icon class="icon" icon="plus" /> &nbsp; Go to my articles
                      </router-link>
                    </div>
                  </div>
                </div>
                <!-- STEP SIX: SUBMIT FOR EVALUATION -->
                <div v-if="steps.six">
                  <div class="p-3 bg-white border border-gray mb-3 shadow-1 radius-3">
                    <h4>Tutor Application Check-in</h4>
                    <Evaluation :fetch_user="fetch_user" />
                  </div>
                </div>
              </div>
            </div>
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
import ProfilePicture from "@/app/Dashboard/Shared/Settings/ProfilePicture";
import UserInfo from "@/app/Dashboard/Shared/Settings/UserInfo";
import Location from "@/app/Dashboard/Shared/Settings/Location";
import Education from "@/app/Dashboard/Shared/Settings/Education";
import Legal from "@/app/Dashboard/Shared/Settings/Legal";
import Evaluation from "./Evaluation";
export default {
  name: "TutorProfile",
  components: {
    ProfilePicture,
    UserInfo,
    Location,
    Education,
    Legal,
    Evaluation
  },

  data() {
    return {
      loaded: false,
      submitDisable:false,
      isStepOne: true,
      steps: {
        zero: true,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false
      }
    };
  },
  mounted() {
    const username = JSON.parse(localStorage.getItem("user")).username;
    if (username) {
      this.FETCH_USER(username);
    }
    this.loaded = true;
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
    auth() {
      return JSON.parse(localStorage.getItem("isAuth"));
    },
    fetch_user() {
      return this.$store.getters.fetch_user;
    },
    ...mapGetters(["fetch_user"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    ...mapActions(["FETCH_USER"]),
    goTo(step) {
      this.steps = {
        zero: false,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false
      };
      Object.entries(this.steps).forEach((element, index) => {
        if (element[0] === step) {
          this.steps[step] = true;
        }
      });
      this.$store.dispatch("RESET_FETCH_USER");
    }
  }
};
</script>

<style scoped>
.content-wrapper {
}
.content-steps {
  width: 98%;
  display: block;
}
.submit-disabled {
  opacity: 0.3;
}
.profile-nav-box {
  border: 1px solid #dfdfdf;
  border-top: 5px solid #ababc2;
  width: 96%;
  margin: 0 1% 10px 1%;
  padding: 8px 1%;
  border-radius: 4px !important;
  font-weight: bold;
  cursor: pointer;
  position: relative;
}
.profile-nav-box.active {
  border-top: 5px solid #403ea8;
  border-color: #403ea8;
}
.profile-nav-box.isOkay::before {
  position: absolute;
  content: "";
  bottom: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  background: #ffffff url("../../../../assets/images/step_checked.svg");
  background-size: 20px 20px;
  border-radius: 4px;
}
.profile-nav-box.isNotOkay::before {
  position: absolute;
  content: "";
  bottom: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  background: #ffffff url("../../../../assets/images/step_unchecked.svg");
  background-size: 20px 20px;
  border-radius: 4px;
}
.profile-nav-box img {
  max-width: 40px;
  margin-left: 4px;
}
.content-steps .btn {
  min-width: 220px;
}
</style>
