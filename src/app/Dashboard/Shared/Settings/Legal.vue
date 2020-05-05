<template>
  <div>
    <Loading v-if="profile.loading" />
    <div v-if="legal" class="my-2 alert alert-success">
      Last updated:
      <b>{{legal.updatedAt | date}}</b>
    </div>
    <div v-if="!profile.loading">
      <form @submit.prevent>
        <div class="row" v-if="profile && profile.errors">
          <div
            class="alert alert-danger"
            v-for="error in profile.errors"
            :key="error.index"
          >{{error}}</div>
        </div>
        <div class="row" v-if="profile && profile.message">
          <div class="alert alert-success">
            {{profile.message}}.
            <br />
            <router-link :to="'login'">Click here</router-link>&nbsp;to login
          </div>
        </div>
        <div class="m-3">
          <div class="row my-3 bg-white shadow-lg radius-3rounded">
            <div class="col-3">
              <div class="image image-identity">
                <img src="@/assets/images/id.svg" alt />
              </div>
            </div>
            <div class="col-9">
              <h5 class="my-3">
                NID or Passport
                <span
                  class="float-right py-1 px-2 bg-success text-light"
                  v-if="legal && legal.passport"
                >
                  <icon class="icon" icon="check" />
                </span>
                <span
                  class="float-right py-1 px-2 bg-danger text-light"
                  v-if="!legal || !legal.passport"
                >Not provided</span>
              </h5>
              <div class="my-1">Provide a photocopy of National ID or Passport</div>
              <div class="form-group" style="max-width:350px">
                <label class="error" v-if="error.bulletinid">{{error.id}}</label>
                <b-form-file single :placeholder="'Select'" :file-name-formatter="getID"></b-form-file>
              </div>
            </div>
          </div>
          <div class="row my-3 bg-white shadow-lg radius-3rounded">
            <div class="col-3">
              <div class="image image-identity">
                <img src="@/assets/images/diploma.svg" alt />
              </div>
            </div>
            <div class="col-9">
              <h5 class="my-3">
                Diploma
                <span
                  class="float-right py-1 px-2 bg-success text-light"
                  v-if="legal && legal.diploma"
                >
                  <icon class="icon" icon="check" />
                </span>
                <span
                  class="float-right py-1 px-2 bg-danger text-light"
                  v-if="!legal || !legal.diploma"
                >Not provided</span>
              </h5>
              <div class="my-1">Provide your diploma</div>
              <div class="form-group" style="max-width:350px">
                <label class="error" v-if="error.diploma">{{error.diploma}}</label>
                <b-form-file single :placeholder="'Select'" :file-name-formatter="getDIP"></b-form-file>
              </div>
            </div>
          </div>
          <div class="row my-3 bg-white shadow-lg radius-3rounded">
            <div class="col-3">
              <div class="image image-identity">
                <img src="@/assets/images/report.svg" alt />
              </div>
            </div>
            <div class="col-9">
              <h5 class="my-3">
                High school report: S5
                <span
                  class="float-right py-1 px-2 bg-success text-light"
                  v-if="legal && legal.seniorFive"
                >
                  <icon class="icon" icon="check" />
                </span>
                <span
                  class="float-right py-1 px-2 bg-danger text-light"
                  v-if="!legal || !legal.seniorFive"
                >Not provided</span>
              </h5>
              <div class="my-1">Provide senior 5 report</div>
              <div class="form-group" style="max-width:350px">
                <label class="error" v-if="error.bulletin5">{{error.bulletin5}}</label>
                <b-form-file single :placeholder="'Select'" :file-name-formatter="getFiveReport"></b-form-file>
              </div>
            </div>
          </div>
          <div class="row my-3 bg-white shadow-lg radius-3rounded">
            <div class="col-3">
              <div class="image image-identity">
                <img src="@/assets/images/report.svg" alt />
              </div>
            </div>
            <div class="col-9">
              <h5 class="my-3">
                High school report: S6
                <span
                  class="float-right py-1 px-2 bg-success text-light"
                  v-if="legal && legal.seniorSix"
                >
                  <icon class="icon" icon="check" />
                </span>
                <span
                  class="float-right py-1 px-2 bg-danger text-light"
                  v-if="!legal || !legal.seniorSix"
                >Not provided</span>
              </h5>
              <div class="my-1">Provide senior 6 report</div>
              <div class="form-group" style="max-width:350px">
                <label class="error" v-if="error.bulletin6">{{error.bulletin6}}</label>
                <b-form-file single :placeholder="'select'" :file-name-formatter="getSixReport"></b-form-file>
              </div>
            </div>
          </div>
          <div class="row my-3 bg-white shadow-lg radius-3rounded">
            <div class="col-3">
              <div class="image image-identity">
                <img src="@/assets/images/cv.svg" alt />
              </div>
            </div>
            <div class="col-9">
              <h5 class="my-3">
                Curriculum Vitae
                <span
                  class="float-right py-1 px-2 bg-success text-light"
                  v-if="legal && legal.cv"
                >
                  <icon class="icon" icon="check" />
                </span>
                <span
                  class="float-right py-1 px-2 bg-danger text-light"
                  v-if="!legal || !legal.cv"
                >Not provided</span>
              </h5>
              <div class="my-1">Provide your CV</div>
              <div class="form-group" style="max-width:350px">
                <label class="error" v-if="error.cv">{{error.cv}}</label>
                <b-form-file single :placeholder="user.cv" :file-name-formatter="getCV"></b-form-file>
              </div>
            </div>
          </div>
          <div class="row my-3">
            <button
              type="submit"
              @click.prevent
              @click="upload"
              class="btn btn-success rounded px-4"
            >
              <icon class="icon" icon="save" />&nbsp;
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
    <br />
  </div>
</template>

<script>
import Loading from "@/components/commons/Loading";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";

const possibleFiles = [
  "image/png",
  "image/jpeg",
  "image/jpeg",
  "application/pdf"
];
export default {
  components: {
    Loading
  },
  name: "identity",
  props: ["legal"],
  data() {
    return {
      images: {},
      error: {
        bulletin5: "",
        bulletin6: "",
        id: "",
        cv: "",
        diploma: ""
      },
      user: {
        language: [],
        experience: "",
        bulletin5: 'High school report: S5',
        bulletin6: 'High school report: S6',
        id: 'NID or Passport',
        cv: 'CV',
        diploma: 'Disploma'
      }
    };
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
    documents() {}
  },
  methods: {
    validateUploads(file, document) {
      if (possibleFiles.includes(file.type)) {
        this.error[document] = "";
      } else {
        this.error[document] = "file format not supported";
      }
    },

    getFiveReport(file) {
      if (file) {
        this.images[0] = file;
        this.user.bulletin = file.name;
        this.validateUploads(file[0], "bulletin5");
        return file[0].name;
      }
    },
    getSixReport(file) {
      if (file) {
        this.images[1] = file;
        this.user.bulletin = file.name;
        this.validateUploads(file[0], "bulletin6");
        return file[0].name;
      }
    },
    getID(file) {
      if (file) {
        this.images[2] = file;
        this.user.id = file.name;
        this.validateUploads(file[0], "id");
        return file[0].name;
      }
    },
    getDIP(file) {
      if (file) {
        this.images[3] = file;
        this.user.diploma = file.name;
        this.validateUploads(file[0], "diploma");
        return file[0].name;
      }
    },

    getCV(file) {
      if (file) {
        this.images[4] = file;
        this.user.cv = file.name;
        this.validateUploads(file[0], "cv");
        return file[0].name;
      }
    },

    async upload() {
      let data = [];
      const formData = new FormData();
      for (let i in this.images) {
        data = [...this.images[i], ...data];
      }
      for (let j in data) {
        formData.append("doc", data[j]);
      }
      return this.$store.dispatch("UPLOAD_DOCUMENTS", formData);
    }
  }
};
</script>

<style scoped>
.image-identity img {
  max-width: 80px !important;
  margin: 25px auto;
  display: block;
}
.error {
  color: brown;
}
.register h1 {
  font-size: 20px;
  text-align: center;
  padding: 20px 0;
  text-transform: uppercase;
}
.register h2 {
  text-align: center;
  font-size: 14px;
  font-weight: 300;
}
.register {
  margin-bottom: 50px;
}
.alert {
  width: 100%;
}
</style>
