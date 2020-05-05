<template>
  <div id="my-kids" class="box">
    <div class="text-center mb-4">
      <button id="show-btn" class="btn bg-white shadow rounded px-3" @click="popUserForm()">
        <icon class="icon" icon="plus" />
        <span class="d-none d-md-inline d-lg-inline px-1">Register learner</span>
      </button>
    </div>
    <!-- LIST OF KIDS -->
    <div v-if="fetch_kids && fetch_kids.kids">
      <div class="shadow-lg bg-light radius-3 mb-4 mt-2 row" style="position:relative" v-for="kid in fetch_kids.kids" :key="kid.index">
        <div class="col-sm-3 col-md-3 col-lg-3">
          <div class="image">
            <img src="@/assets/images/kid.svg" class="rounded-circle mb-1" :alt="kid.names" />
            <img
              src="@/assets/images/down-right.svg"
              class="mb-4"
              style="max-width:60px;margin:0 auto;display:block"
            />
          </div>
          <div
            class="alert alert-success radius-1 text-center mx-2"
            v-if="
            kid.tutoring && (kid.tutoring.status === 'accepted' ||
            kid.tutoring.status === 'request_cancel')"
          >Tutor is coaching your child</div>
          <div
            class="alert alert-warning radius-1 text-center mx-2"
            v-if="kid.tutoring && kid.tutoring.status === 'requested'"
          >Request to tutor your child is pending</div>
          <div
            class="alert alert-danger radius-1 text-center mx-2"
            v-if="kid && !kid.tutoring"
          >No tutorship connected</div>
        </div>
        <div class="col-sm-9 col-md-9 col-lg-9">
          <h3 class="my-3 px-0">{{kid.names}}</h3>
          <div>
            School:
            <b>{{kid.school}}</b>
          </div>
          <div>
            Class:
            <b>{{kid.class}}</b>
          </div>
          <div class="divider bg-gray my-3"></div>
          <div class="px-3">
            <Tutor
              v-if="kid.tutoring && kid.tutoring.status !== 'terminated'"
              :tutor="kid.tutoring.tutor"
            />
            <div class="my-2 mx-0" v-if="kid && !kid.tutoring">
              <b>{{kid.names}}</b> does not have a tutor.
              <br />
              <router-link
                class="btn btn-success shadow rounded my-3"
                :to="`/dashboard/${accountType}/messages`"
              >Find perfect tutor</router-link>
            </div>
            <div
              class="alert bg-danger text-light radius-1 text-center mx-2"
              v-if="kid.tutoring && kid.tutoring.status === 'terminated'"
            >Tutorship contract has been terminated</div>
          </div>
        </div>
        <div class="dropdown option-nav">
          <b-dropdown id="option-nav" right no-caret class="m-md-2" variant="outline-light">
            <template v-slot:button-content>
              <icon icon="ellipsis-v" class="icon float-right text-dark" />
            </template>
            <b-dropdown-item @click="popKidInfo(kid)">
              <icon class="icon" icon="child" />&nbsp; Child details
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="popUserForm(kid)" class="text-danger">
              <icon class="icon" icon="pen" />&nbsp; Edit
            </b-dropdown-item>
            <b-dropdown-item @click="popToDeleteKid(kid.id, kid.names)" class="text-danger">
              <icon class="icon" icon="trash" />&nbsp; Delete kid
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <!-- MODAL, DELETE A KID -->
    <b-modal id="delete-kid" hide-footer>
      <template class="bg-danger" v-slot:modal-title>Delete</template>
      <div class="text-danger border border-danger rounded p-3" style="font-size:14px">
        All information related to
        <b>{{previewKidToBeDeleted.names}}</b> including tutorship, questions&amp;answers, resources and conversations will be deleted.
      </div>
      <div
        v-if="delete_kid && (delete_kid.message || delete_kid.errors.error)"
        class="alert alert-danger my-2"
      >{{delete_kid.message || delete_kid.errors.error}}</div>
      <div class="my-2 lg-text" v-if="!delete_kid.deleted">
        Are you sure you want to delete
        <b>"{{previewKidToBeDeleted.names}}"</b>?
      </div>
      <div class="my-4">
        <button
          v-if="!delete_kid.deleted"
          type="submit"
          @click.prevent
          @click="submit_delete_kid(previewKidToBeDeleted.id)"
          class="btn btn-danger rounded px-4"
        >
          <icon class="icon" icon="trash" />&nbsp; Delete now
        </button>
        <b-button
          @click.prevent
          @click="$bvModal.hide('delete-kid')"
          v-if="!delete_kid.deleted"
          class="btn btn-outline-dark mx-2 px-5 rounded btn-light"
        >Cancel</b-button>
        <a
          v-if="delete_kid.deleted"
          :href="`/profile/${profile.user.username}/tutoring`"
          class="btn btn-outline-dark mx-2 px-5 rounded btn-light"
        >Close &amp; Reflesh</a>
        <div
          v-show="delete_kid.loading"
          class="spinner-border text-primary float-right m-1"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </b-modal>

    <!-- MODAL, VIEW A KID -->
    <b-modal id="view-kid" hide-footer>
      <template class="bg-danger" v-slot:modal-title>
        <b>Kid information</b>
      </template>
      <div class="my-3">
        <h5 class="bold">Kid</h5>
        <ul class="list-group">
          <li class="list-group-item">
            <b>Names:</b>
            <span class="capitalize">{{kidInfoPreview.names}}</span>
          </li>
          <li class="list-group-item">
            <b>Date of birth:</b>
            {{ new Date(kidInfoPreview.dateOfBirth).toDateString() }}
          </li>
          <li class="list-group-item">
            <b>School:</b>
            <span class="capitalize">{{ kidInfoPreview.school }}</span>
          </li>
          <li class="list-group-item">
            <b>Class:</b>
            <span class="uppercase">{{ kidInfoPreview.class }}</span>
          </li>
          <li class="list-group-item">
            <b>Registered:</b>
            {{ kidInfoPreview.createdAt | date }}
          </li>
          <li v-show="!kidInfoPreview.tutoring" class="list-group-item bg-danger text-light">
            <icon class="icon" icon="exclamation-circle" />&nbsp; No tutorship found
          </li>
        </ul>
      </div>
      <div class="my-3" v-if="kidInfoPreview.tutoring && kidInfoPreview.tutoring">
        <h5 class="bold">Tutoring</h5>
        <ul class="list-group">
          <li class="list-group-item">
            <b>Tutorship:</b>
            {{kidInfoPreview.tutoring.status === 'accepted' || kidInfoPreview.tutoring.status === 'request_cancel' ? 'Ongoing' : ''}}
            {{kidInfoPreview.tutoring.status === 'requested' ? 'Pending' : ''}}
            {{kidInfoPreview.tutoring.status === 'rejected' ? 'Cancelled' : ''}}
            {{kidInfoPreview.tutoring.status === 'terminated' ? 'Terminated' : ''}}
          </li>
          <li class="list-group-item">
            <b>Since</b>
            {{kidInfoPreview.tutoring.createdAt | date }}
          </li>
          <li class="list-group-item">
            <b>Tutor:</b>
            {{ kidInfoPreview.tutoring.tutor.firstName }}
            {{ kidInfoPreview.tutoring.tutor.lastName }}
          </li>
        </ul>
      </div>
      <div class="my-4">
        <b-button
          class="btn btn-outline-dark mx-2 px-4 rounded btn-light"
          @click="$bvModal.hide('view-kid')"
        >
          <icon class="icon" icon="long-arrow-alt-left" />&nbsp; Back
        </b-button>
        <router-link
          v-if="!kidInfoPreview.tutoring"
          :to="`/profile/${profile.user.username}/tutoring`"
          class="btn btn-outline-dark rounded px-4"
        >Search tutors</router-link>
      </div>
    </b-modal>

    <!-- MODAL, REGISTER, EDIT A KID -->
    <b-modal id="register" hide-footer>
      <template v-slot:modal-title>{{title}}</template>
      <div>
        <div
          class="alert alert-success"
          role="alert"
          v-if="(register_kid.registered || edit_kid.edited) && message"
        >{{message}}</div>
        <div
          class="alert alert-danger"
          role="alert"
          v-if="register_kid.errors[0] && register_kid.errors[0].error"
        >{{register_kid.errors[0].error}}</div>
      </div>
      <div class="row">
        <div class="col m-4">
          <form
            v-show="!edit_kid.edited && !register_kid.registered"
            :class="{ 'form-group--error': $v.names.$error }"
          >
            <div class="form-group">
              <label for="names">Names</label>
              <input
                type="names"
                v-model="$v.names.$model"
                class="form-control"
                id="names"
                autocomplete="off"
              />
              <div class="error py-2" v-if="!$v.names.required">Names are required</div>
              <div
                class="error py-2"
                v-if="!$v.names.minLength"
              >Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
            </div>
            <div class="form-group">
              <label for="age">Date of birth</label>
              <datetime
                type="date"
                v-model="dateOfBirth"
                zone="Africa/Kigali"
                :phrases="{ok: 'Continue', cancel: 'Cancel'}"
                :min-datetime="minDatetime"
                :max-datetime="maxDatetime"
                :week-start="7"
                auto
              ></datetime>
            </div>
            <div class="form-group">
              <label for="school">School</label>
              <input
                type="school"
                v-model="$v.school.$model"
                class="form-control"
                id="school"
                autocomplete="off"
              />
              <div class="error py-2" v-if="!$v.school.required">School is required</div>
              <div
                class="error py-2"
                v-if="!$v.school.minLength"
              >School must have at least {{$v.school.$params.minLength.min}} letters.</div>
            </div>
            <div class="form-group">
              <label for="class">Class</label>
              <input
                type="class"
                v-model="$v.class.$model"
                class="form-control"
                id="class"
                autocomplete="off"
              />
              <small
                id="classHelp"
                class="form-text text-muted"
              >Use N* for nursary and P* for Primary school(e.g.: N2, P3)</small>
              <div class="error py-2" v-if="!$v.class.required">Class is required</div>
              <div
                class="error py-2"
                v-if="!$v.class.minLength"
              >Class must have at least {{$v.class.$params.minLength.min}} letters.</div>
            </div>
            <div class="row">
              <button
                type="submit"
                @click.prevent
                @click="submit_kid"
                class="btn bg-success text-light rounded px-4"
              >Submit</button>
              <b-button
                class="btn btn-light rounded px-3 ml-2"
                @click="$bvModal.hide('register')"
              >Cancel</b-button>
              <div class="float-right m-1">
                <b-spinner v-show="false"></b-spinner>
              </div>
            </div>
          </form>
          <div v-show="register_kid.registered || edit_kid.edited" class="my-4">
            <b-button
              class="btn btn-outline-primary px-3 rounded btn-light"
              @click="$bvModal.hide('register')"
            >Close</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
const { validationMixin, default: Vuelidate } = require("vuelidate");
import Datetime from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import Tutor from "./Tutor";

Vue.use(Datetime);

Vue.use(Vuelidate);

const account_layout = "account";

export default {
  name: "MyKids",
  props: ["profile"],
  components: {
    Tutor
  },
  component: {
    datetime: Datetime
  },
  data() {
    return {
      loaded: false,
      names: this.name || "",
      school: "",
      dateOfBirth: "",
      class: "",
      id: "",
      minDatetime: "1980-01-01",
      maxDatetime: new Date().toISOString().slice(0, 10),
      message: "",
      kidInfoPreview: {},
      previewKidToBeDeleted: {
        id: "",
        names: ""
      },
      buttonText: "",
      registering: false
    };
  },
  mounted() {
    this.loaded = true;
    this.FETCH_KIDS();
  },
  computed: {
    register_kid() {
      this.message = this.$store.getters.register_kid.message;
      return this.$store.getters.register_kid;
    },
    fetch_kids() {
      return this.$store.getters.fetch_kids;
    },
    delete_kid() {
      return this.$store.getters.delete_kid;
    },
    edit_kid() {
      this.message = this.$store.getters.edit_kid.message;
      return this.$store.getters.edit_kid;
    },
    fetch_kids() {
      return this.$store.getters.fetch_kids;
    },
    ...mapGetters(["fetch_kids"])
  },
  methods: {
    // pop delete or edit
    async popUserForm(data) {
      this.names = "";
      this.class = "";
      this.dateOfBirth = "";
      this.school = "";
      this.message = "";
      this.id = "";
      if (data) {
        this.names = data.names;
        this.class = data.class;
        this.dateOfBirth = data.dateOfBirth;
        this.school = data.school;
        this.id = data.id;
        this.title = "Edit learner";
        this.buttonText = "Edit learner";
        this.registering = false;
      } else {
        this.title = "Edit learner";
        this.buttonText = "Register now";
        this.registering = true;
      }
      this.$store.dispatch("INITIATE_KID_EDIT");
      this.$store.dispatch("INITIATE_KID_EDIT");
      await this.$bvModal.show("register");
    },
    // pop kid info
    async popKidInfo(kid) {
      this.kidInfoPreview = "";
      await this.$bvModal.show("view-kid");
      this.kidInfoPreview = kid;
    },
    // pop to delete
    async popToDeleteKid(id, names) {
      await this.INITIATE_DELETE_KID();
      this.previewKidToBeDeleted = {
        id,
        names
      };
      await this.$bvModal.show("delete-kid");
    },
    async submit_kid() {
      const data = {
        names: this.names,
        class: this.class,
        dateOfBirth: this.dateOfBirth.split("T")[0],
        school: this.school,
        id: this.id
      };
      if (this.registering) {
        await this.REGISTER_KID(data);
      } else {
        await this.EDIT_KID(data);
        await this.FETCH_KIDS;
      }
    },
    async submit_delete_kid(id) {
      await this.DELETE_KID(id);
      await this.FETCH_KIDS;
    },
    ...mapActions([
      "FETCH_KIDS",
      "REGISTER_KID",
      "EDIT_KID",
      "DELETE_KID",
      "INITIATE_DELETE_KID",
      "INITIATE_KID_EDIT"
    ])
  },
  validations: {
    names: {
      required,
      minLength: minLength(4)
    },
    school: {
      required,
      minLength: minLength(4)
    },
    class: {
      required,
      minLength: minLength(2)
    }
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
.grab-tutor {
  background: rgb(48, 72, 148);
  background: linear-gradient(
    35deg,
    rgba(48, 72, 148, 1) 0%,
    rgba(183, 33, 255, 1) 100%
  );
}
.grab-no-tutor {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgb(246, 246, 246) 50%,
    rgba(200, 200, 200, 1) 100%
  );
}
.option-nav .dropdown-menu li {
  position: relative;
  left: 0px;
}
.option-nav .dropdown-menu li .icon {
  margin-left: -10px;
  color: #b3b3b3;
}
.vdatetime-input {
  padding: 12px 6px !important;
}
.wrap-one-tutering:hover {
  background: #f2f4f5 !important;
}
.wrap-media-btn {
  position: absolute;
  top: 70px;
  right: 20px;
}
.option-nav {
  position: absolute;
  top: 15px;
  right: 10px;
}
.option-nav .dropdown-menu li {
  position: relative;
  left: 0px;
}
.option-nav .dropdown-menu li .icon {
  margin-left: -10px;
  color: #b3b3b3;
}
</style>
