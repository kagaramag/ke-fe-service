<template>
  <div>
    <div v-if="!loaded" class="grab-page-loading"></div>
    <div v-if="loaded">
      <!-- START -->
      <div class="py-2 px-3">
        <ul class="list-unstyled checkin-steps" v-if="fetch_user">
          <li class="one-step">
            <span class="text-secondary">STEP 1</span>
            <h4>Profile</h4>
            <span class="checked" :class="{ 'isOkay': isProfileOkay, 'isNotOkay': !isProfileOkay }"></span>
          </li>
          <li class="one-step">
            <span class="text-secondary">STEP 2</span>
            <h4>Location</h4>
            <span
              class="checked"
              :class="{ 'isOkay': isLocationOkay, 'isNotOkay': !isLocationOkay }"
            ></span>
          </li>
          <li class="one-step">
            <span class="text-secondary">STEP 3</span>
            <h4>Education</h4>
            <span
              class="checked"
              :class="{ 'isOkay': isEducationOkay, 'isNotOkay': !isEducationOkay }"
            ></span>
          </li>
          <li class="one-step">
            <span class="text-secondary">STEP 4</span>
            <h4>Legal Documents</h4>
            <span class="checked" :class="{ 'isOkay': isLegalOkay, 'isNotOkay': !isLegalOkay }"></span>
          </li>
          <li class="one-step">
            <span class="text-secondary">STEP 5</span>
            <h4>Articles</h4>
            <span class="checked" :class="{ 'isOkay': isBlogOkay, 'isNotOkay': !isBlogOkay }"></span>
          </li>
        </ul>
        <div
          class="alert alert-danger radius-2"
          role="alert"
          v-if="
        !isProfileOkay ||
        !isLocationOkay ||
        !isEducationOkay ||
        !isLegalOkay ||
        !isBlogOkay
        "
        >
          <h4 class="alert-heading">You can not submit your request</h4>
          <p>We found that you did not provide all necessary information for your application.</p>
          <hr />
          <p
            class="mb-0"
            v-if="!isProfileOkay"
          >You must provide all necessary profile information including bio summary and profile picture</p>
          <p class="mb-0" v-if="!isLocationOkay">You must tell us where you live</p>
          <p class="mb-0" v-if="!isEducationOkay">You must at least add one education background</p>
          <p class="mb-0" v-if="!isLegalOkay">You must submit all necessary legal documents</p>
          <p class="mb-0" v-if="!isBlogOkay">You must at least write one article</p>
        </div>
        <div
          class="my-3 alert alert-warning"
          v-show="fetch_user && fetch_user.details && fetch_user.details.evaluation"
        >You have a pending evaluation request. Please wait until we get back to you.</div>
        <div class="my-3 font-weight-light">
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="agree" id="agreeTerms" />
              <label class="form-check-label" for="agreeTerms">
                I certify that all provided information are correct to the best of my knowledge. I understand that the consequence of any false information is ground for expulsion and that I will be prohibited from applying to any future
                <b>Keetela</b> programs and I agree to the
                <router-link :to="'/'">
                  <b>Terms and agreement</b>
                </router-link>&nbsp; and
                <router-link :to="'/'">
                  <b>Privacy Policy</b>
                </router-link>
              </label>
              <div class="invalid-feedback">You must agree before submitting.</div>
            </div>
          </div>
          <br />
        </div>
        <div class="my-3">
          <button
            type="submit"
            @click.prevent
            @click="submitForEvaluation"
            :disabled="!agree || !submitEnabled"
            class="btn btn-success rounded px-4"
          >Request evaluation</button>
        </div>
        <div class="my-3">
          <div
            class="alert alert-success my-2"
            v-show="fetch_user && fetch_user.message && fetch_user.details_updated"
          >{{fetch_user.message}}</div>
          <div
            class="row m-0"
            v-if="fetch_user && !fetch_user.details_updated && fetch_user.errors"
          >
            <div
              class="alert alert-danger"
              v-for="error in fetch_user.errors"
              :key="error.index"
            >{{error}}</div>
          </div>
        </div>
      </div>
      <!-- END -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProfileUserCheckin",
  // props: ["fetch_user"],
  data() {
    return {
      loaded: false,
      agree: false,
      isProfileOkay: false,
      isLocationOkay: false,
      isEducationOkay: false,
      isLegalOkay: false,
      isBlogOkay: false,
      submitEnabled: false
    };
  },
  mounted() {
    this.loaded = true;
  },
  created() {
    this.evaluateSteps();
  },
  computed: {
    fetch_user() {
      return this.$store.getters.fetch_user;
    },
    ...mapGetters(["fetch_user"])
  },
  methods: {
    evaluateSteps() {
      // check profile information
      if (
        this.fetch_user.user &&
        this.fetch_user.user.bio &&
        this.fetch_user.user.image
      ) {
        this.isProfileOkay = true;
      }
      // check if user provided his location
      if (
        this.fetch_user.location &&
        this.fetch_user.location.province &&
        this.fetch_user.location.district &&
        this.fetch_user.location.sector &&
        this.fetch_user.location.cell
      ) {
        this.isLocationOkay = true;
      }
      // check if user provided at least one education background
      if (this.fetch_user.education && this.fetch_user.education.length) {
        this.isEducationOkay = true;
      }
      // check if user provided necessary legal documents
      if (
        this.fetch_user.legal &&
        this.fetch_user.legal.passport &&
        this.fetch_user.legal.diploma &&
        this.fetch_user.legal.seniorFive &&
        this.fetch_user.legal.seniorSix &&
        this.fetch_user.legal.cv
      ) {
        this.isLegalOkay = true;
      }
      // check if user has at least one article
      if (this.fetch_user.articles && this.fetch_user.articles.length) {
        this.isBlogOkay = true;
      }
      if (
        this.isProfileOkay &&
        this.isLocationOkay &&
        this.isEducationOkay &&
        this.isLegalOkay &&
        this.isBlogOkay
      ) {
        this.submitEnabled = true;
      } else {
        this.submitEnabled = false;
      }
    },
    submitForEvaluation() {
      if (this.agree && this.submitEnabled) {
        this.REQUEST_EVALUATION();
      }
    },
    ...mapActions(["REQUEST_EVALUATION"])
  }
};
</script>

<style scoped>
.checkin-steps {
  border: 1px solid #dbdbdb;
  border-radius: 7px !important;
}
.checkin-steps li {
  padding: 15px 0 15px 20px !important;
  border-bottom: 1px solid #dbdbdb;
  position: relative;
}
.checkin-steps li:last-child {
  border-bottom: none !important;
}
.checkin-steps li .checked {
  position: absolute;
  top: 20px;
  right: -21px;
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
  background-color: #c21f1f;
  background-image: url("../../../../assets/images/step_unchecked.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 15px 15px;
}
.checkin-steps li .checked.isOkay {
  background-color: #419957;
}
.checkin-steps li .checked.isNotOkay {
  background-color: #c21f1f;
}
</style>