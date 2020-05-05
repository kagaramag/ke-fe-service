<template>
  <div>
    <div v-if="!loaded" class="grab-page-loading"></div>
    <div v-if="loaded">
      <!-- START -->
      <div class="py-2">
        <div>
          <ul class="list-unstyled" v-if="education && education">
            <li v-if="!enableEducationForm" class="mb-3 py-2 px-3">
              <div class="row mb-3">
                <div class="col-1">
                  <icon class="icon text-muted mt-2" style="font-size:2.2em;" icon="plus" />
                </div>
                <div class="col-11">
                  <button
                    class="btn btn-secondary radius-1 my-2"
                    v-on:click="educationForm()"
                  >Add education background</button>
                </div>
              </div>
            </li>
            <li v-if="enableEducationForm" class="mb-3 py-2 px-3">
              <form method="post">
                <h5 class="mb-3">Add education background</h5>
                <b-form-group id="input-group-10" label="Ongoing or Graduated?:" label-for="input-11">
                  <b-form-select v-model="form.graduated">
                    <template v-slot:first>
                      <option :value="null" disabled>Are you a graduate?</option>
                    </template>

                    <option value="True">Yes</option>
                    <option value="False">No</option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="input-group-1" label="Year of graduation:" label-for="input-1">
                  <b-form-input
                    id="input-0"
                    v-model="form.yearOfGraduation"
                    type="date"
                    required
                    placeholder="Year of Graduation"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-11" label="Level:" label-for="input-11">
                  <b-form-select v-model="form.college">
                    <template v-slot:first>
                      <option :value="null" disabled>Level</option>
                    </template>
                    <option value="College/University">College or University</option>
                    <option value="High School">High School</option>
                  </b-form-select>
                </b-form-group>

                <b-form-group id="input-group-2" label="Institution:" label-for="input-1">
                  <b-form-input
                    id="input-2"
                    v-model="form.institution"
                    type="text"
                    required
                    placeholder="What institution?"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-11"
                  label="Certificate obtained in the mentioned school/university:"
                  label-for="input-12"
                >
                  <b-form-select v-model="form.certificate">
                    <template v-slot:first>
                      <option :value="null" disabled>Certificate</option>
                    </template>
                    <option value="Masters">Masters</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Advanced diploma">Advanced diploma</option>
                    <option value="High School">High School</option>
                    <option value="Other">Other</option>
                  </b-form-select>
                </b-form-group>
                <b-form-group id="input-group-3" label="Faculty/Option:" label-for="input-1">
                  <b-form-input
                    id="input-3"
                    v-model="form.course"
                    type="text"
                    required
                    placeholder="What course did you take?"
                  ></b-form-input>
                </b-form-group>
                <div class="my-3">
                  <button
                    type="submit"
                    @click.prevent
                    @click="saveEducation"
                    :disabled="!validateEducation"
                    class="btn btn-success rounded px-4"
                  >Save</button>
                  <button
                    type="button"
                    @click.prevent
                    @click="cancelEducation"
                    class="btn btn-secondary rounded px-4"
                  >Cancel</button>
                </div>
              </form>
              <div
                class="row m-0"
                v-if="fetch_user && !fetch_user.education_updated && fetch_user.errors"
              >
                <div
                  class="alert alert-danger"
                  v-for="error in fetch_user.errors"
                  :key="error.index"
                >{{error}}</div>
              </div>
            </li>
            <li
              class="mb-3 py-2 px-3"
              v-show="fetch_user && fetch_user.message && fetch_user.education_updated"
            >
              <div class="alert alert-success my-2">{{fetch_user.message}}</div>
            </li>
            <li class="mb-3 py-2 px-3" v-for="e in education" :key="e.index">
              <div class="row mb-3">
                <div class="col-1">
                  <img
                    src="@/assets/images/profile-education.svg"
                    style="max-width:40px"
                    alt="Education"
                  />
                </div>
                <div class="col-11">
                  <h3 class="mt-0">{{e.institution}}</h3>
                  <span class="text-muted">
                    {{e.certificate}} Education Background
                    <b>{{e.course}}</b>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div class="rounded bg-white p-3 text-center" v-if="education && !education.length">
            <icon icon="exclamation-circle" style="font-size:3.4em" class="icon my-4 text-muted" />
            <h4>No education provided yet</h4>
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
  name: "ProfileUserEducation",
  props: ["education"],
  data() {
    return {
      loaded: false,
      enableEducationForm: false,
      form: {
        college: null,
        graduated: null,
        yearOfGraduation: new Date().toISOString(),
        institution: "",
        course: "",
        certificate: ""
      }
    };
  },
  mounted() {
    this.loaded = true;
  },
  computed: {
    validateEducation() {
      if (
        !this.form.college ||
        !this.form.graduated ||
        !this.form.institution ||
        !this.form.course ||
        !this.form.certificate
      ) {
        return false;
      }
      return true;
    },
    fetch_user() {
      return this.$store.getters.fetch_user;
    },
    ...mapGetters(["fetch_user"])
  },
  methods: {
    educationForm() {
      this.enableEducationForm = true;
      this.$store.dispatch("RESET_FETCH_USER");
    },
    cancelEducation() {
      this.enableEducationForm = false;
    },
    saveEducation(e) {
      this.UPDATE_USER_EDUCATION(this.form);
    },
    ...mapActions(["UPDATE_USER_EDUCATION"])
  }
};
</script>

<style scoped>
.list-unstyled li {
  border-top: 1px solid #dedede;
}
</style>
