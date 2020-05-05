<template>
  <div id="user-info">
    <div>
      <h4>Account information</h4>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="hidden">
            <form method="post">
              <div class="form-group">
                <label class="bold" for="firstName">Firstname</label>
                <input
                  type="text"
                  v-model="info.firstName"
                  class="form-control"
                  id="firstName"
                  autocomplete="off"
                />
              </div>
              <div class="form-group">
                <label class="bold" for="lastName">Lastname</label>
                <input
                  type="text"
                  v-model.trim="$v.info.lastName.$model"
                  class="form-control"
                  id="lastName"
                  autocomplete="off"
                />
                <div class="error py-2" v-if="!$v.info.lastName.required">Last name is required</div>
                <div
                  class="error py-2"
                  v-if="!$v.info.lastName.minLength"
                >Last name must have at least {{$v.info.lastName.$params.minLength.min}} letters.</div>
                <div
                  class="error py-2"
                  v-if="!$v.info.lastName.maxLength"
                >Last name must not have more than {{$v.info.lastName.$params.maxLength.max}} letters.</div>
              </div>
              <div class="form-group">
                <label class="bold" for="lastName">Username</label>
                <input
                  type="text"
                  v-model="info.username"
                  class="form-control"
                  id="username"
                  autocomplete="off"
                />
                <div
                  class="text-info"
                >Choose your username wisely. It helps people to uniquely identify you across the platform</div>

                <div class="error py-2" v-if="!$v.info.username.required">Username is required</div>
                <div
                  class="error py-2"
                  v-if="!$v.info.username.minLength"
                >Username must have at least {{$v.info.username.$params.minLength.min}} characters.</div>
                <div
                  class="error py-2"
                  v-if="!$v.info.username.maxLength"
                >Username must not have more than {{$v.info.username.$params.maxLength.max}} characters.</div>
                <div
                  class="error py-2"
                  v-if="!$v.info.username.alphaNum"
                >Username must be alpha-numberic characters.</div>
              </div>
              <div class="form-group">
                <label class="bold" for="bio">Bio</label>

                <vue-editor
                  id="editor"
                  useCustomImageHandler
                  v-model="info.bio"
                  :editorToolbar="toolbar"
                ></vue-editor>
              </div>
              <button
                type="submit"
                @click.prevent
                @click="updateUser"
                class="btn btn-success rounded px-4"
              >Save</button>
              <div class="float-right m-1">
                <b-spinner v-show="false"></b-spinner>
              </div>
              <div
                class="alert alert-success my-2"
                v-show="fetch_user && fetch_user.message && fetch_user.info_updated"
              >{{fetch_user.message}}</div>
            </form>
          </div>
        </div>
        <div
          v-show="fetch_user && fetch_user.error"
          class="border border-danger"
        >{{fetch_user.error}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { VueEditor } from "vue2-editor";
import {
  required,
  minLength,
  maxLength,
  alphaNum,
  between,
  email,
  helpers
} from "vuelidate/lib/validators";
const { validationMixin, default: Vuelidate } = require("vuelidate");
Vue.use(Vuelidate);
const alpha = helpers.regex("alpha", /^[a-zA-Z]*$/);

const account_layout = "account";
export default {
  name: "ProfileUserInfo",
  props: ["profile"],
  components: {
    VueEditor
  },
  data() {
    return {
      file: null,
      image: null,
      profileUpdated: false,
      info: {
        firstName: "",
        lastName: "",
        bio: "",
        username: ""
      },
      toolbar: [
        ["bold", "italic", "underline"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ["clean"]
      ]
    };
  },
  computed: {
    fetch_user() {
      return this.$store.getters.fetch_user;
    },
    ...mapGetters(["fetch_user"]),
    validatePhoto() {
      if (!this.image) {
        return false;
      }
      return true;
    }
  },
  created() {
    this.info = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      bio: this.profile.bio,
      username: this.profile.username
    };
  },
  methods: {
    ...mapActions(["UPDATE_PROFILE"]),
    updateUser() {
      this.$toast.open({
        message: "Loading...",
        type: "warning"
      });
      const formData = {
        firstName: this.info.firstName,
        lastName: this.info.lastName,
        bio: this.info.bio,
        username: this.info.username
      };
      this.UPDATE_PROFILE(formData);
      this.profileUpdated = true;
      setTimeout(() => {
        this.profileUpdated = false;
      }, 2000);
    }
  },
  // validation
  validations: {
    info: {
      firstName: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(45)
      },
      lastName: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(45)
      },
      username: {
        required,
        alphaNum,
        minLength: minLength(5),
        maxLength: maxLength(35)
      },
      bio: {
        required,
        minLength: minLength(8)
      }
    }
  }
};
</script>

<style scoped>
.profile {
  max-width: 200px;
}
.form-group .border.border-light {
  border-color: #cdcdcd !important;
}
</style>