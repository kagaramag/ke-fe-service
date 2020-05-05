<template>
  <div id="user-info">
    <div>
      <h4 class="my-2">Profile photo</h4>
      <div class="my-2">Change your profile photo</div>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-4">
          <div class="image">
            <img
              :src="file ? file : (fetch_user.user.image || avatar)"
              style="max-width:100%;height:auto;"
              class="mx-auto"
              :alt="fetch_user.user.firstName"
            />
          </div>
        </div>

        <div class="col-lg-9 col-md-8 col-sm-8">
          <b-form-file
            accept="image/jpeg, image/png"
            @change="GetImage"
            class="rounded shadow my-2"
            :placeholder="'Choose image (jpeg, png)'"
            :drop-placeholder="'No file chosen'"
            :browse-text="'Browse'"
          ></b-form-file>
          <button
            :disabled="!validatePhoto"
            @click="changeProfile"
            class="btn btn-success rounded px-4 my-3 mr-2"
          >
            <icon class="icon" icon="image" />&nbsp;Upload &amp; Save
          </button>
        </div>
        <div
          v-show="fetch_user && fetch_user.error"
          class="border border-danger"
        >{{fetch_user.error}}</div>
        <div
          class="alert alert-success my-2"
          v-show="fetch_user && fetch_user.message && fetch_user.photo_updated"
        >{{fetch_user.message}}</div>
      </div>
    </div>

    <!-- MODAL FOR EDITING PROFILE PHOTO -->
    <b-modal ref="my-modal" id="profilepic" hide-footer>
      <template v-slot:modal-title>Change profile</template>
      <div class="row mx-auto"></div>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import editor from "vue2-medium-editor";

const account_layout = "account";
export default {
  components: {
    "medium-editor": editor
  },
  name: "Parent",
  props: ["profile"],
  data() {
    return {
      file: null,
      image: null,
      profileUpdated: false,
      info: {
        firstName: "",
        lastName: "",
        bio: ""
      },
      options: {
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: ["bold", "italic", "underline", "h2", "h3", "quote"]
        }
      }
    };
  },
  computed: {
    ...mapGetters(["fetch_user", "edit_user"]),
    validatePhoto() {
      if (!this.image) {
        return false;
      }
      return true;
    }
  },
  methods: {
    ...mapActions(["UPDATE_PHOTO"]),
    GetImage(e) {
      let img = e.target.files[0];
      this.image = img;
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = e => {
        this.file = e.target.result;
      };
    },
    async changeProfile() {
      const formData = new FormData();
      formData.append("image", this.image);
      try {
        await this.UPDATE_PHOTO(formData);
        this.$refs["my-modal"].hide();
      } catch (error) {}
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
    handleInputChange(e) {
      if (e.event) {
        this.info.bio = e.event.target.innerHTML || this.edit_user.bio;
      } else {
        const { id, value } = e.target;
        this.info[id] = value;
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