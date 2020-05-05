<template>
  <div>
    <component :is="layout">
      <section id="mentoring" class="m-0 bg-light">
        <div class="grab-bg-page tutoring-cover d-flex align-items-center">
          <div class="container">
            <div class="py-4 px-2 text-white">
              <h1 class="font-weight-bold">Tutoring</h1>
              <h2 class="text-light mb-3">
                We connect you with trusted &amp; verified one-on-one tutor near
                you!
              </h2>
              <h3 class="font-weight-light mb-3">
                Let your children start achieving more today!
              </h3>
              <button
                class="btn btn-lg px-3 btn-success radius-1"
                @click="$bvModal.show('request-tutor')"
              >
                Request a tutor
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        class="courses-cover py-4"
        v-if="get_courses && get_courses.courses && get_courses.loaded"
      >
        <!-- what drives us? -->
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-10">
              <div class="p-4 my-3 radius-2">
                <h1 class="font-weight-light my-2">
                  <span class="bold">We cover almost all subjects</span>
                  <br />
                </h1>
                <div class="py-2">
                  <div class="my-3">
                    <div
                      class="bg-white one-course border rounded"
                      v-for="(course, index) in get_courses.courses"
                      :key="index"
                    >
                      <img :src="course.icon" alt="course" />
                      <span>{{ course.course }}</span>
                    </div>
                  </div>
                  <div class="clear"></div>
                  <div class="py-3">
                    <button class="btn btn-lg btn-primary rounded">
                      <icon class="icon" icon="plus" />&nbsp; See more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-4">
        <div class="container">
          <h1 class="text-center text-primary font-weight-light my-4">
            How Our
            <br />
            <span class="bold">Tutoring Program</span>
            <br />Works!
          </h1>
          <div class="row tutoring-steps">
            <div class="col-sm-12 col-md-6">
              <div class="image mb-sm-3">
                <img
                  src="./../../../assets/images/tutoring-connect.svg"
                  alt="connect"
                  class="float-lg-right"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 text-sm-center text-md-center">
              <h2>Connect</h2>
              <h3 class="font-weight-light">With the best tutor</h3>
              <div>
                Specify your preferred subject, grade, area,  price range and get a list of matching tutors.
              </div>
            </div>
            <div class="py-5 w-100"></div>
            <div class="col-sm-12 col-md-6">
              <div class="image mb-sm-3">
                <img
                  src="./../../../assets/images/tutoring-terms.svg"
                  alt="connect"
                  class="float-lg-right"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 text-sm-center text-md-center">
              <h2>Discuss</h2>
              <h3 class="font-weight-light">Working Terms</h3>
              <div>
                Elaborate working terms, set deliverables  and expected results
                with the suggested tutors and choose one that matches your specific needs.
              </div>
            </div>
            <div class="py-5 w-100"></div>
            <div class="col-sm-12 col-md-6">
              <div class="image mb-sm-3">
                <img
                  src="./../../../assets/images/tutoring-enjoy.svg"
                  alt="connect"
                  class="float-lg-right"
                />
              </div>
            </div>
            <div class="col-sm-12 col-md-6 text-sm-center text-md-center">
              <h2>Experience</h2>
              <h3 class="font-weight-light">noticeable growth</h3>
              <div>
                Learn with the best tutors, track the progress and enjoy noticeable results!
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- REQUEST A TUTOR: MODAL -->
      <b-modal
        size="xl"
        hide-header-close
        hide-header
        scrollable
        id="request-tutor"
        hide-footer
      >
        <div class="row py-0 my-0 align-items-center h-100">
          <div
            class="d-sm-none d-md-none d-lg-block col-md-6 col-lg-7 justify-content-center align-self-center "
          >
            <div class="image">
              <img
                src="./../../../assets/images/bg-tutor-req.jpg"
                style="max-width: 460px"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-5">
            <form v-if="request_tutor && !request_tutor.success">
              <h3 class="font-weight-light">Request a tutor</h3>
              <div class="d-block">
                <div class="form-group">
                  <label for="names">Your names</label>
                  <input
                    type="names"
                    class="form-control"
                    v-model="requestTutor.names"
                    id="names"
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Your email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="requestTutor.email"
                    id="email"
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="tel">Tel</label>
                  <input
                    type="tel"
                    class="form-control"
                    v-model="requestTutor.tel"
                    id="tel"
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="child">Name of tutee</label>
                  <input
                    type="child"
                    class="form-control"
                    v-model="requestTutor.child"
                    id="child"
                    autocomplete="off"
                  />
                </div>
                <b-form-group
                  label="Select subjects"
                  v-if="get_courses && get_courses.loaded"
                >
                  <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="requestTutor.courses"
                    name="courses"
                  >
                    <b-form-checkbox
                      v-for="(course, index) in get_courses.courses"
                      :key="index"
                      :value="course.course"
                      >{{ course.course }}</b-form-checkbox
                    >
                  </b-form-checkbox-group>
                </b-form-group>
                <div
                  class="error py-2"
                  v-if="
                    !$v.requestTutor.names.required ||
                      !$v.requestTutor.email.required ||
                      !$v.requestTutor.courses.required ||
                      !$v.requestTutor.child.required
                  "
                >
                  Please, fill the form properly
                </div>
              </div>
              <div class="py-3">
                <b-button
                  class="mt-3 px-3 bg-primary rounded"
                  @click.prevent
                  @click="requestTutorNow"
                  >Request now</b-button
                >
                <b-button
                  class="mt-3 px-3 rounded"
                  @click="$bvModal.hide('request-tutor')"
                  >Cancel</b-button
                >
              </div>
            </form>
            <div
              class="py-4 text-center"
              v-if="
                request_tutor && request_tutor.success && !request_tutor.loaded
              "
            >
              <h2 class="font-weight-light">
                Thank you for requesting a tutor.<br />
                We will contact you as soon as possible.
              </h2>
            </div>
          </div>
        </div>
      </b-modal>

      <!-- BECOME A TUTOR: MODAL -->
      <b-modal
        size="xl"
        hide-header-close
        hide-header
        scrollable
        id="become-tutor"
        hide-footer
      >
        <div class="row py-0 my-0 align-items-center h-100">
          <div
            class="d-sm-none d-md-none d-lg-block col-md-6 col-lg-7 justify-content-center align-self-center "
          >
            <div class="image">
              <img
                src="./../../../assets/images/bg-tutor-req.jpg"
                style="max-width: 460px"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-5">
            <form v-if="become_tutor && !become_tutor.success">
              <h3 class="font-weight-light">Become a tutor</h3>
              <div class="d-block">
                <div class="form-group">
                  <label for="names">Your names</label>
                  <input
                    type="names"
                    class="form-control"
                    v-model="becomeTutor.names"
                    id="names"
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Your email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="becomeTutor.email"
                    id="email"
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="tel">Tel</label>
                  <input
                    type="tel"
                    class="form-control"
                    v-model="becomeTutor.tel"
                    id="tel"
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="location">Location</label>
                  <input
                    type="location"
                    class="form-control"
                    v-model="becomeTutor.location"
                    id="location"
                    autocomplete="off"
                  />
                </div>
                <div
                  class="error py-2"
                  v-if="
                    !$v.becomeTutor.names.required ||
                      !$v.becomeTutor.email.required ||
                      !$v.becomeTutor.tel.required ||
                      !$v.becomeTutor.location.required
                  "
                >
                  Please, fill the form properly
                </div>
              </div>
              <div class="py-3">
                <b-button
                  class="mt-3 px-3 bg-primary rounded"
                  @click.prevent
                  @click="becomeTutorNow"
                  >Apply now</b-button
                >
                <b-button
                  class="mt-3 px-3 rounded"
                  @click="$bvModal.hide('become-tutor')"
                  >Cancel</b-button
                >
              </div>
            </form>
            <div
              class="py-4 text-center"
              v-if="
                become_tutor && become_tutor.success && !become_tutor.loaded
              "
            >
              <h2 class="font-weight-light">
                We have received you application. <br />We will contact you as
                soon as possible.
              </h2>
            </div>
          </div>
        </div>
      </b-modal>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import {
  required,
  minLength,
  maxLength,
  email,
  alpha,
  numeric,
  helpers
} from "vuelidate/lib/validators";
const { validationMixin, default: Vuelidate } = require("vuelidate");
Vue.use(Vuelidate);
const default_layout = "default";
export default {
  metaInfo: {
    title: "Trusted & verified personal tutors",
    titleTemplate: "%s - | Keetela.com | Igniting minds for success!",
    meta: [
      {
        name: "description",
        content:
          "We connect you with trusted & verified one-on-one tutor near you!"
      },
      {
        name: "keywords",
        content: "Tutors, Teachers, One-on-one tutors, Primary subjects, Mathematics, English, French"
      }
    ]
  },
  name: "mentoring",
  data() {
    return {
      requestTutor: {
        names: "",
        email: "",
        tel: "",
        child: "",
        courses: []
      },
      becomeTutor: {
        names: "",
        email: "",
        tel: "",
        location: ""
      }
    };
  },
  mounted() {
    this.fetchCourses();
  },
  computed: {
    get_courses() {
      return this.$store.getters.get_courses;
    },
    request_tutor() {
      return this.$store.getters.request_tutor;
    },
    become_tutor() {
      return this.$store.getters.become_tutor;
    },
    ...mapGetters(["request_tutor", "become_tutor"]),
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  methods: {
    requestTutorNow() {
      this.createTutorRequest(this.requestTutor);
    },
    becomeTutorNow() {
      this.createBecomeTutor(this.becomeTutor);
    },
    ...mapActions(["fetchCourses", "createTutorRequest", "createBecomeTutor"])
  },
  // validation
  validations: {
    requestTutor: {
      names: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(45)
      },
      courses: {
        required
      },
      email: {
        required,
        email
      },
      child: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(22)
      }
    },
    becomeTutor: {
      names: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(45)
      },
      tel: {
        required,
        numeric
      },
      email: {
        required,
        email
      },
      location: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(22)
      }
    }
  }
};
</script>

<style scoped>
.tutoring-cover {
  background: url("../../../assets/images/bg-tutoring.jpg");
}
.courses-cover {
  background: url("../../../assets/images/bg-courses.jpg");
  background-attachment: scroll;
  background-position: center top;
  background-size: cover;
  position: relative;
}
.courses-cover::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  background: rgba(255, 255, 255, 0.25);
  width: 100%;
  height: 100%;
}
.one-course {
  position: relative;
  width: 32%;
  float: left;
  border-radius: 5px;
  margin: 0 1% 10px 0;
  padding: 15px 0 !important;
}
.one-course span {
  position: relative;
  left: 55px;
  margin: 10px 0;
}
.one-course img {
  position: absolute;
  width: 30px;
  height: auto;
  top: 10px;
  left: 15px;
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
  .tutoring-steps::before{
    display: none;
  }
}
@media only screen and (max-width: 767px) {
  .one-course {
    width: 99%;
  }
  .tutoring-steps::before{
    display: none;
  }
}
</style>
