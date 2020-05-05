<template>
  <div>
    <component :is="layout">
      <section id="mentoring" class="m-0 bg-light">
        <div class="grab-bg-page mentoring-cover d-flex align-items-center">
          <div class="container">
            <div class="py-4 px-2 text-white">
              <h1 class="font-weight-bold">Mentoring</h1>
              <h2 class="text-light mb-3">
                Small &amp; medium business owners who receive 3 hours of
                mentoring report higher revenues.
              </h2>
              <h3 class="font-weight-light mb-3">
                Let us help you find the best mentor and start achieving your
                goals.
              </h3>
              <button class="btn btn-lg px-3 btn-success rounded">
                Request a mentor
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="py-4">
        <div class="container">
          <h3 class="text-center h1 text-primary font-weight-light my-4">
            <span class="bold">Mentorship</span>
            <br />
            Program for everyone!
          </h3>
          <div class="py-3 text-center">
            We connect you with a personal coach to guide you through every step
            you take.<br />
            The personal advice and guidance tailored to you shapes your way to
            success.
          </div>
          <div class="row py-5 mentorship-for-everyone text-center">
            <div class="col-sm-12 col-md-4 my-3">
              <h4 class="font-weight-light">Students</h4>
              <div class="image">
                <img
                  src="./../../../assets/images/mentor-student.svg"
                  alt="connect"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-4 my-3">
              <h4 class="font-weight-light">Professionals</h4>
              <div class="image">
                <img
                  src="./../../../assets/images/mentor-professional.svg"
                  alt="connect"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-4 my-3">
              <h4 class="font-weight-light">Individuals</h4>
              <div class="image">
                <img
                  src="./../../../assets/images/mentor-individual.svg"
                  alt="connect"
                />
              </div>
            </div>
          </div>
          <h3 class="text-center h2 text-primary font-weight-light my-4">
            Say Bye to <span class="bold">Self-Doubt,</span>
            <br />
            &amp; Embrance <span class="bold">Self-Confidence</span>
          </h3>
          <div class="py-3 text-center">
            Step up your career game plan, prep up interviews, job search &amp; promotion.<br>
            Your mentor will listen to your doubts, give solutions (all drawn from their experience) and take you where you want to be.
          </div>
        </div>
      </section>
      <section class="courses-cover py-4">
        <!-- what drives us? -->
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-10">
              <div class="p-4 my-3 radius-2">
                <h1 class="font-weight-light text-white my-2">
                  <span class="bold"
                    >Find mentorship topics that suits you!</span
                  >
                </h1>
                <div class="py-1">
                  <div class="py-4 text-white">
                    Achieve your goals starting from today. We have hundrends topics you can choose!
                  </div>
                  <div class="my-3">
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        Career Guidance
                      </span>
                    </div>
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        Accounting &amp; Taxes
                      </span>
                    </div>
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        UI &amp; UX
                      </span>
                    </div>
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        Business Strategy
                      </span>
                    </div>
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        Legal issues
                      </span>
                    </div>
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        Sales &amp; Marketing
                      </span>
                    </div>
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        English
                      </span>
                    </div>
                    <div class="bg-white one-course shadow-sm">
                      <span>
                        Start business
                      </span>
                    </div>
                  </div>
                  <br />
                  <button class="btn btn-lg btn-primary radius-1">
                    <icon class="icon" icon="plus" />
                    See more
                  </button>
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
    title: "Looking for personal mentor?",
    titleTemplate: "%s - | Keetela.com | Igniting minds for success!",
    meta: [
      {
        name: "description",
        content:
          "We connect you with a personal coach to guide you through every step you take"
      },
      {
        name: "keywords",
        content: "Mentorship, Students, Professionals, Business, Mentorship topics, Accounting, Career guidance, Business strategy"
      }
    ]
  },
  name: "mentoring",
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>

<style scoped>
.mentoring-cover {
  background-image: url("../../../assets/images/mentoring-cover.jpg");
}
.courses-cover {
  background-image: url("../../../assets/images/mentoring-topics-bg.jpg");
  background-color: #fff;
  background-attachment: fixed;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat !important;
  position: relative;
}
.courses-cover::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  background: rgba(64, 62, 168, 0.75);
  width: 100%;
  height: 100%;
}
.one-course {
  position: relative;
  width: 24%;
  float: left;
  border-radius: 5px;
  margin: 0 1% 10px 0;
  padding: 15px 0 !important;
}
.one-course span {
  position: relative;
  left: 15px;
  margin: 10px 0;
}
.one-course img {
  position: absolute;
  width: 30px;
  height: auto;
  top: 10px;
  left: 15px;
}
.mentorship-for-everyone img {
  width: 160px;
  margin: 0 auto;
  display:block;
  height: auto;
}
.tutoring-steps {
  padding: 45px 0;
  position: relative;
}
.tutoring-steps::before {
  content: "";
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  width: 1px;
  height: 100%;
  background: #cdcdcd;
  position: absolute;
}
.tutoring-steps img {
  width: 120px;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .one-course {
    width: 49%;
  }
}
@media only screen and (max-width: 767px) {
  .one-course {
    width: 99%;
  }
}
</style>
