<template>
  <div>
    <component :is="layout">
      <div class="mx-4 px-2">
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3">
            <Nav />
          </div>
          <div class="col-sm-12 col-md-9 col-lg-9">
            <h1 class="mb-2">
              <span class="font-weight-light">Tutors</span>
              <button
                v-b-modal.create-tutor
                class="btn btn-success px-3 rounded shadow border-0 float-right"
              >
                <icon class="icon" icon="plus" />
              </button>
            </h1>
            <div v-if="get_tutors && get_tutors.tutors && get_tutors.loaded">
              <b-card
                class="mb-4 radius-2 shadow-lg"
                :title="tutor.user.names"
                :sub-title="`${tutor.user.email} - ${tutor.user.tel}`"
                v-for="(tutor, index) in get_tutors.tutors"
                :key="index"
              >
                <b-card-text>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item px-0">
                      <b>Courses:</b>
                      <span
                        class="mr-3 border py-1 px-3 radius-1"
                        v-for="(course, index) in tutor.courses"
                        :key="index"
                      >{{course}}</span>
                    </li>
                    <li class="list-group-item px-0">
                      <b>Availability:</b>
                      <span
                        class="mr-3 border py-1 px-3 radius-1"
                        v-for="(val, index) in tutor.availability"
                        :key="index"
                      >{{val}}</span>
                    </li>
                    <li class="list-group-item px-0">
                      <b>Location:</b>
                      <span
                        class="mr-3 border py-1 px-3 radius-1"
                        v-for="(location, index) in tutor.location"
                        :key="index"
                      >{{location}}</span>
                    </li>
                  </ul>
                  <div class="mt-3" v-html="tutor.bio"></div>
                </b-card-text>
                <button class="btn border radius-2">Update</button>
                <button class="btn border radius-2 ml-2">Deactivate</button>
                <button class="btn border radius-2 ml-2">View</button>
                <button class="btn border radius-2 ml-2">View on Public</button>
              </b-card>
            </div>
          </div>
        </div>
      </div>
      <b-modal id="create-tutor" hide-footer size="lg" title="Create tutor">
        {{create_tutor}}
        <b-form v-if="create_tutor && !create_tutor.loading && !create_tutor.success">
          <h4 class="font-weight-light my-3">Personal Information</h4>
          <div class="row">
            <div class="col-12">
              <b-input
                id="inline-form-input-name"
                v-model="tutor.user.names"
                type="text"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Names"
              ></b-input>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-8">
              <b-input
                id="inline-form-input-name"
                v-model="tutor.user.email"
                type="email"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Email"
              ></b-input>
            </div>
            <div class="col-4">
              <b-input
                id="inline-form-input-name"
                v-model="tutor.user.tel"
                type="tel"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Tel"
              ></b-input>
            </div>
          </div>
          <h4 class="font-weight-light my-3">Tutor availability</h4>
          <div>
            <b-form-tags v-model="value" no-outer-focus class="mb-2">
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      variant="info"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>

                <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                  <template v-slot:button-content>Availability</template>
                  <b-dropdown-form @submit.stop.prevent="() => {}">
                    <b-form-group
                      label-for="tag-search-input"
                      label-cols-md="auto"
                      class="mb-0"
                      label-size="sm"
                      :description="searchDesc"
                      :disabled="disabled"
                    >
                      <b-form-input
                        v-model="search"
                        id="tag-search-input"
                        type="search"
                        size="sm"
                        autocomplete="off"
                      ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-item-button
                    v-for="day in availableDays"
                    :key="day"
                    @click="onDayClick({ day, addTag })"
                  >{{ day }}</b-dropdown-item-button>
                  <b-dropdown-text
                    v-if="availableDays.length === 0"
                  >There are no tags available to select</b-dropdown-text>
                </b-dropdown>
              </template>
            </b-form-tags>
          </div>
          <h4 class="font-weight-light my-3">Highest education</h4>
          <div class="row">
            <div class="col-4">
              <b-form-select v-model="tutor.education.diploma" :options="optionsDiploma"></b-form-select>
            </div>
            <div class="col-4">
              <b-form-input
                type="text"
                v-model="tutor.education.certificate"
                placeholder="Certificate"
              ></b-form-input>
            </div>
            <div class="col-4">
              <b-form-input
                type="text"
                v-model="tutor.education.school"
                placeholder="School or University"
              ></b-form-input>
            </div>
          </div>
          <h4 class="font-weight-light my-3">Languages I speak</h4>
          <div>
            <b-form-group>
              <b-form-checkbox-group id="tutor-languages" v-model="tutor.languages" name="flavour-2">
                <b-form-checkbox value="English">English</b-form-checkbox>
                <b-form-checkbox value="French">French</b-form-checkbox>
                <b-form-checkbox value="Kinyarwanda">Kinyarwanda</b-form-checkbox>
                <b-form-checkbox value="Swahili">Swahili</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <h4 class="font-weight-light my-3">Latest/Current Employment</h4>
          <div class="row">
            <div class="col-6">
              <b-form-input
                v-model="tutor.employment.institution"
                type="text"
                placeholder="Institution"
              ></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input
                type="text"
                v-model="tutor.employment.position"
                placeholder="Post"
              ></b-form-input>
            </div>
          </div>
          <h4 class="font-weight-light my-3">District of Residence</h4>
          <div>
            <b-form-radio-group
              v-model="tutor.address"
              :options="optionsAddress"
              class="mb-3"
              value-field="item"
              text-field="name"
            ></b-form-radio-group>
          </div>
          <h4 class="font-weight-light my-3">Courses I teach</h4>
          <div>
            <b-form-group label="Prefered courses" v-if="get_courses && get_courses.courses">
              <b-form-checkbox-group id="checkbox-group-2" v-model="tutor.courses" name="courses">
                <b-form-checkbox
                  v-for="(course, key) in get_courses.courses"
                  :key="key"
                  :value="course.course"
                >{{course.course}}</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <h4 class="font-weight-light my-3">Availabible location</h4>
          <div>
            <b-form-group>
              <b-form-checkbox-group id="tutor-location" v-model="tutor.location" name="flavour-2">
                <b-form-checkbox value="Student Location">Student Location</b-form-checkbox>
                <b-form-checkbox value="Tutor Location">Tutor Location</b-form-checkbox>
                <b-form-checkbox value="Public Space">Public Space</b-form-checkbox>
                <b-form-checkbox value="Online">Online</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <h4 class="font-weight-light my-3">Salary expected</h4>
          <div class="row">
            <div class="col-6">
              <b-form-input type="text" v-model="tutor.price.low" placeholder="High Price"></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input type="text" v-model="tutor.price.high" placeholder="Low Price"></b-form-input>
            </div>
          </div>
          <h4 class="font-weight-light my-2">Tutor Summary</h4>
          <div>
            <vue-editor id="editor" v-model="tutor.bio" :editorToolbar="toolbar"></vue-editor>
          </div>
          <div class="mb-4">
            <b-button class="mt-2" @click.prevent="saveTutor()" variant="btn btn-primary">Save now</b-button>
            <b-button class="mt-3" variant="btn btn-secondary float-right">Cancel</b-button>
          </div>
        </b-form>
        <div
          v-if="create_tutor && !create_tutor.loading && !create_tutor.success && create_tutor.errors"
        >{{create_tutor.errors}}</div>
        <div
          v-if="create_tutor && create_tutor.loading && !create_tutor.success"
        >Loading, please wait...</div>
      </b-modal>
    </component>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "vue-moment";
import NotFound from "@/app/NotFound/ContentNotFound";
import { mapGetters, mapActions } from "vuex";
import editor from "vue2-medium-editor";
import "@/assets/css/medium-editor.min.css";
import "@/assets/css/flat.min.css";
import { VueEditor } from "vue2-editor";
import { setResizeListeners } from "@/helpers/TextareaAutoResizer";
import Nav from "./Nav";
const account_layout = "account";

Vue.use(moment);

export default {
  name: "DashboardSubscriptionsIndex",
  components: {
    Nav,
    NotFound,
    VueEditor
  },
  data() {
    return {
      loaded: false,
      show: false,
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      tutor: {
        user: {
          names: "",
          tel: "",
          email: ""
        },
        bio: "",
        location: "",
        address: "",
        availability: [],
        courses: [],
        languages: [],
        education: {
          school: "",
          diploma: ""
        },
        employment: {
          institution: "",
          position: ""
        },
        price: {
          low: "",
          high: ""
        },
        active: true,
        verified: false
      },
      optionsAddress: [
        { item: "Kicukiro", name: "Kicukiro" },
        { item: "Gasabo", name: "Gasabo" },
        { item: "Nyarugenge", name: "Nyarugenge" },
        { item: "Other", name: "Other" }
      ],
      optionsDiploma: [
        { item: "A Level", text: "A Level" },
        { item: "Advanced Diploma", text: "Advanced Diploma" },
        { item: "Bachelor", text: "Bachelor" },
        { item: "Certificate", text: "Certificate" },
        { item: "Other", text: "Other" }
      ],
      optionsLanguages: [
        { item: "English", name: "English" },
        { item: "French", name: "French" },
        { item: "Kinyarwanda", name: "Kinyarwanda" },
        { item: "Swahili", name: "Swahili" }
      ],
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        [{ header: 1 }, { header: 2 }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ["link"],
        ["image", "video"],
        ["clean"]
      ],
      search: "",
      value: [],
      topicIcon: "https://image.flaticon.com/icons/svg/432/432541.svg"
    };
  },
  created() {
    this.loaded = true;
    console.log("moment()");
  },
  mounted() {
    this.fetchCourses();
    this.fetchTutors();
    setResizeListeners(this.$el, ".js-autoresize");
  },
  computed: {
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableDays() {
      const criteria = this.criteria;
      // Filter out already selected days
      const days = this.days.filter(opt => this.value.indexOf(opt) === -1);
      if (criteria) {
        // Show only days that match criteria
        return days.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
      }
      // Show all days available
      return days;
    },
    searchDesc() {
      if (this.criteria && this.availableDays.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
    get_courses() {
      return this.$store.getters.get_courses;
    },
    create_tutor() {
      return this.$store.getters.create_tutor;
    },
    ...mapGetters(["get_courses", "create_tutor", "get_tutors"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    onDayClick({ day, addTag }) {
      addTag(day);
      this.search = "";
    },
    saveTutor() {
      this.show = true;

      this.tutor.user.handle =
        `${this.tutor.user.names.replace(/ /g, '-').trim().toLowerCase()}-${Math.floor(Math.random() * 1000)}`;
      this.tutor = {
        ...this.tutor,
        availability: this.value,
        createdAt: (new Date()).toISOString(),
        updatedAt: (new Date()).toISOString()
      };
      this.createTutor(this.tutor);
    },
    ...mapActions(["fetchCourses", "fetchTutors", "createTutor"])
  }
};
</script>

<style scoped>
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
</style>
