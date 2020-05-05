<template>
  <div id="tutors">
    <component :is="layout">
      <div class="grab-apply-cover d-flex align-items-center">
        <div class="py-4 px-2 text-center text-white">
          <h1>Apply for tutor</h1>
          <p>Join one-on-one teachers and personal trainers who coaches a large community any where in Rwanda</p>
          <div class="my-3" v-if="accountType === 't'">
            <router-link
              :to="'/dashboard/t/tutor-application'"
              class="btn btn-success rounded"
            >Get started</router-link>
          </div>
          <div
            class="my-3"
            v-if="accountType === 'p' || accountType === 'n'"
          >You are not allowed to apply for this job. If you think it is by mistake, contact us.</div>
          <div class="my-3" v-if="!auth">
            <router-link
              :to="'/dashboard/t/tutor-application'"
              class="btn btn-success rounded"
            >Login to apply</router-link>
          </div>
        </div>
      </div>
      <div class="container">
        <div style="max-width:800px;display:block;margin:0 auto" class="p-4 shadow-lg">
          <h2 class="mt-4">[We are hiring]</h2>
          <div class="my-5">
            <p>We are Looking for skilled and experienced tutors, teachers, and graduates who can tutor various subjects including Math, English, French, Biology, Physics, and Chemistry. You must have good command of one or more of these subjects! Lessons are held across the City of Kigali.</p>
            <p>
              <b>Position</b>: Part-time
            </p>
            <p>
              <b>Locations covered</b>:City of Kigali
            </p>
            <p>
              <b>Hours of Operation</b>: Depend on the availability of tutee
            </p>
            <p>
              <b>Salary</b>: based on the value you set but it must be reasonable
            </p>
            <p>
              <b>Minimum requirements</b>: Have a diploma, certificate or related degree
            </p>
            <p>
              <b>Also Required</b>:
            </p>
            <p>Superior communication ѕkіllѕ.</p>
            <p>Ability to Teach. Spread the love!</p>
            <p>Solid time management and organizational abilities. You need to be committed to a session if booked</p>
            <p>Friendly and approachable.</p>
            <p>Must be willing to undergo a criminal record clearance.</p>
            <p><b>Required documents</b>:</p>
            <p>Diploma</p>
            <p>Have senior 5 and 6 reports</p>
            <p>National ID/Passport</p>
            <p>Certificate, or</p>
            <p>CV</p>
            <p>Writing at least one blog post</p>
            <p><b>Job Type</b>: Part-time</p>
            <p><b>Location</b>: Kigali</p>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
export default {
  name: "tutors",
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    this.loaded = true;
  },
  computed: {
    auth() {
      return JSON.parse(localStorage.getItem("user"));
    },
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>
<style scoped>
.grab-apply-cover {
  height: 50vh;
  background: url("../../assets/images/coaching-kig.jpg");
  background-attachment: scroll;
  background-position: center top;
  background-size: cover;
  position: relative;
}
.grab-apply-cover::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: 1;
}
.grab-apply-cover h1 {
  width: 100%;
  position: relative;
  z-index: 10;
}
.grab-apply-cover div {
  width: 100%;
  position: relative;
  z-index: 10;
}
.align-items-center {
  -ms-flex-align: center !important;
  align-items: center !important;
}
.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}
</style>
