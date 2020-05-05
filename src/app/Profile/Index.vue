<template>
  <div id="account">
    <component :is="layout">
      <div v-if="loaded && fetch_user.loading" class="grab-page-loading"></div>
      <div v-if="loaded && fetch_user && !fetch_user.loading && fetch_user.success">
        <div class="mb-3">
          <ProfileBar :data="fetch_user" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-4">
              <div class="alert alert-success radius-1" role="alert">
                <div class="row">
                  <div class="col-sm-3 p-0">
                    <img src="@/assets/images/active-tutor.svg"
                    style="width:100%"
                     alt="Active tutor">
                  </div>
                  <div class="col-sm-9">
                    <h4 class="alert-heading">Active tutor</h4>Our verification process ensures this tutors meet our high standards of quality & excellence
                  </div>
                </div>
              </div>
              <div v-if="fetch_user.legal" class="provided bg-white border border-gray radius-1 p-2 mb-3">
                <h4 class="p-2">{{fetch_user.user.firstName}} provided</h4>
                <div v-if="fetch_user.legal.passport">
                  <icon class="icon" icon="check-circle" />Identity information
                </div>
                <div v-if="fetch_user.legal.diploma">
                  <icon class="icon" icon="check-circle" />Diploma
                </div>
                <div v-if="fetch_user.legal.seniorFive && fetch_user.legal.seniorFive">
                  <icon class="icon" icon="check-circle" />Transcripts
                </div>
                <div v-if="fetch_user.location">
                  <icon class="icon" icon="check-circle" />Location
                </div>
              </div>
              <img
                src="@/assets/images/coding-class-1.jpg"
                class="img-fluid img-thumbnail rounded"
                alt="Coding Class Ads"
              />
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8">
              <ProfileBio v-if="fetch_user.user" :user="fetch_user.user" />
              <Legal
                v-if="fetch_user.user && fetch_user.user.UserRole.role === 'tutor'"
                :user="fetch_user"
              />
              <Education v-if="fetch_user.education" :education="fetch_user && fetch_user.education" />
              <Availability
                v-if="fetch_user.details"
                :availability="fetch_user.details.availability"
              />
              <Articles v-if="fetch_user.articles" :articles="fetch_user.articles" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="loaded && fetch_user && !fetch_user.loading && !fetch_user.success">
        <NotFound
          message="User not found"
          description="The user you are trying to view does not exist or the account may be deactivitated"
          icon="user"
        />
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions, mapState } from "vuex";
import ProfileBar from "@/app/Dashboard/Shared/ProfileBar";
import NotFound from "@/app/NotFound/ContentNotFound";
import ProfileBio from "./ProfileBio";
import Legal from "./Legal";
import Education from "./Education";
import Articles from "./Articles";
import Availability from "./Availability";

const default_layout = "default";
export default {
  name: "ProfilePage",
  components: {
    ProfileBar,
    NotFound,
    ProfileBio,
    Legal,
    Education,
    Articles,
    Availability
  },
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    const currentUsername = this.$route.params.username;
    this.FETCH_USER(currentUsername);
    this.loaded = true;
  },
  computed: {
    fetch_user() {
      const user = this.$store.getters.fetch_user;
      return user;
    },
    ...mapGetters(["fetch_user"]),
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  methods: {
    ...mapActions(["FETCH_USER"])
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

.provided div {
  padding: 10px 10px;
}
.provided div .icon {
  padding-right: 5px;
  color: #1a8352;
  font-size: 22px;
}
</style>
