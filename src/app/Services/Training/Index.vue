<template>
  <div>
    <component :is="layout">
      <section id="training" class="m-0 bg-light">
        <div class="grab-bg-page training-cover d-flex align-items-center">
          <div class="container">
            <div class="py-4 px-2 text-white">
              <h1 class="font-weight-bold">Training</h1>
              <h2 class="text-light mb-3">Training solutions for individuals and group of businesses</h2>
              <h3
                class="font-weight-light mb-3"
              >We offers a wide range of lifelong-learning solutions in training centres, meetups, campuses and tailored remote program!</h3>
            </div>
          </div>
        </div>
      </section>
      <section class="py-4">
        <div class="container">
          <div class="row py-5 align-items-center mentorship-for-everyone">
            <div class="col-sm-12 col-md-6 col-lg-6">
              <h3 class="h1 text-primary font-weight-light my-4">
                Our
                <br />
                <span class="bold">Training</span>
                <br />Program
              </h3>
              <h4 class="py-3 h4 font-weight-light">
                We elevate
                <b>technical</b> and
                <b>professional</b> skills of learners with the most in-demand technologies!
              </h4>
              <div>
                <!-- Smart for business and great for people -->
              </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
              <div class="image bg-primary">
                <img src="./../../../assets/images/training-proram.jpg" alt="training program" />
              </div>
            </div>
          </div>
          <h3 class="text-center h2 text-primary font-weight-light my-4">
            <span class="bold">Short Courses</span>
            <br />&amp;
            <span class="bold">Workshops</span>
          </h3>
          <div class="py-3 text-center">
            We are committed to uplift people’s lives,
            <br />stimulate personal growth and grow economy through world class training.
          </div>
          <div class="clear"></div>
          <div class="grab-boxes">
            <div class="row align-items-center">
              <div class="col-sm-12 col-md-6 col-lg-6 my-2">
                <div class="one-box bg-white radius-2 shadow">
                  <h4 class="py-2 font-weight-light">Individuals</h4>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 my-2">
                <div class="one-box bg-white radius-2 shadow">
                  <h4 class="py-2 font-weight-light">Graduates</h4>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 my-2">
                <div class="one-box bg-white radius-2 shadow">
                  <h4 class="py-2 font-weight-light">Professionals</h4>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-6 my-2">
                <div class="one-box bg-white radius-2 shadow">
                  <h4 class="py-2 font-weight-light">Group of People</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
export default {
  metaInfo: {
    title: "Training solutions for individuals, organizations and businesses",
    titleTemplate: "%s - | Keetela.com | Igniting minds for success!",
    meta: [
      {
        name: "description",
        content:
          "We offers a wide range of lifelong-learning solutions to choose from: in a training centre or in companies/organizations, on-site or via distance learning, leading to certificates"
      },
      {
        name: "keywords",
        content:
          "Training, Institutions, Organizations, Professionals, Business, Training topics, Accounting, Career guidance, Business strategy"
      }
    ]
  },
  name: "training",
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>

<style scoped>
.training-cover {
  background-image: url("../../../assets/images/training-cover.jpg");
}
.mentorship-for-everyone img {
  margin: 0 auto;
  display: block;
  height: auto;
}
.grab-boxes {
  max-width: 800px;
  margin: 0 auto;
  display: block;
  text-align: center;
}
.grab-boxes .one-box {
  margin: 10px auto;
  padding: 15px 0;
}
</style>
