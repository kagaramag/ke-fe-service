
<template>
  <div>
     <component :is="layout">
    <div class="container">
      <div class="row justify-content-lg-center">
        <div class="col-lg-10">
          <div
            class="py-1 compose-submit-spinner"
            v-if="loaded && 
          !created_post.success && 
          created_post.loading"
          >
            <img src="@/assets/images/spinner.svg" alt="loading" />
          </div>
          <div v-if="loaded && !created_post.success" class="keetela-card">
            <form>
              <div class="clear"></div>
              <div>
                <textarea
                  class="textarea js-autoresize"
                  v-model="post.title"
                  rows="1"
                  placeholder="Add title"
                ></textarea>
              </div>
              <div class="pb-3 upload-image radius-1 justify-content-lg-center">
                <label id="custom-upload-file" for="upload-cover-image">
                  <img src="@/assets/images/upload-image.svg" v-if="!post.coverUrl" />
                  <div class="image">
                    <img
                      :src="post.coverUrl"
                      style="max-width:100%;height:auto;"
                      class="mx-auto rounded shadow"
                    />
                  </div>
                </label>
                <b-form-file
                  accept="image/jpeg, image/png"
                  @change="GetImage"
                  class="upload-cover-image my-2"
                  id="upload-cover-image"
                  :placeholder="'Choose image (jpeg, png)'"
                  :drop-placeholder="'No file chosen'"
                  :browse-text="'Brow'"
                ></b-form-file>
              </div>

              <div class="py-3">
                <vue-editor
                  id="editor"
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                  v-model="post.body"
                  :editorToolbar="toolbar"
                ></vue-editor>
                <div v-if="upload.loading">Uploading image...</div>
                <div
                  v-if="upload.error"
                  class="text-danger alert alert-danger mt-1"
                >Whooops, Something went wrong while uploading your image</div>
              </div>
              <!-- Admin section -->
              <div v-if="accountType && accountType == 'p'" class="p-3 mb-2 border border-light">
                <div class="custom-control custom-switch">
                  <input
                    type="checkbox"
                    v-model="post.faqs"
                    value="false"
                    data-size="large"
                    class="custom-control-input"
                    id="faqs"
                  />
                  <label class="custom-control-label" for="faqs">
                    <b>Support</b>
                  </label>
                </div>
              </div>
              <div class="row m-0" v-if="created_post && created_post.errors">
                <div
                  class="alert alert-danger"
                  v-for="error in created_post.errors"
                  :key="error.index"
                >{{error}}</div>
              </div>
              <div id="fixed-btn">
                <button
                  v-on:click.prevent="save"
                  class="btn bg-success rounded text-light ml-0"
                >Save &amp; Publish</button>
                <button
                  v-on:click.prevent="save"
                  class="btn bg-dark rounded text-light"
                >Save as draft</button>
              </div>
            </form>
            <div class="clear"></div>
          </div>
          <div class="container mb-4 mt-2 text-center" v-if="loaded && created_post.success">
            <div class="row">
              <img
                src="@/assets/images/content-creator.svg"
                style="width:350px;margin:0 auto;display:block"
                alt
              />
            </div>
            <div class="clear"></div>
            <h2 class="text-success my-5">Thank you for creating this amazing post.</h2>
            <div class="my-3">
              <router-link
                :to="`/post/${created_post.article.category}/${created_post.article.slug}`"
                class="btn bg-dark px-3 rounded text-light"
              >View post</router-link>
              <router-link
                :to="`/blog`"
                class="btn bg-dark px-3 rounded text-light"
              >Go to blog</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Header from "@/components/commons/HeaderAdmin";
import editor from "vue2-medium-editor";
import "@/assets/css/medium-editor.min.css";
import "@/assets/css/flat.min.css";
import TextareaAutosize from "vue-textarea-autosize";
import { setResizeListeners } from "@/helpers/TextareaAutoResizer";
import { VueEditor } from "vue2-editor";
import AxiosHelper from "@/helpers/AxiosHelper";
const account_layout = "account";

Vue.use(TextareaAutosize);

export default {
  name: "CreateBlogPost",
  components: {
    Header,
    VueEditor
  },
  data() {
    return {
      post: {
        body: "",
        title: "",
        // coverUrl: null,
        faqs: false
      },
      image: null,
      loaded: false,
      success: false,
      submitingPost: false,
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
      upload: {
        loading: false,
        error: false
      }
    };
  },
  computed: {
    profile() {
      return localStorage.getItem("user") || null;
    },
    errors() {
      return this.$store.getters.errors;
    },
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    },
    created_post() {
      const post = this.$store.getters.created_post;
      return post;
    },
    ...mapGetters(["created_post"])
  },
  mounted() {
    this.loaded = true;
    setResizeListeners(this.$el, ".js-autoresize");
  },
  methods: {
    save() {
      this.submitingPost = true;
      const formData = new FormData();
      formData.append("coverUrl", this.image);
      formData.append("title", this.post.title);
      formData.append("body", this.post.body);
      this.post.faqs ? formData.append("category", "faqs") : null ;
      this.CREATE_POST(formData);
    },
    ...mapActions(["CREATE_POST"]),
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      this.upload = {
        loading: true,
        error: false
      };
      var formData = new FormData();
      formData.append("image", file);
      AxiosHelper.post(`/upload/article`, formData)
        .then(response => {
          const {
            data: {
              image: { original }
            }
          } = response;
          Editor.insertEmbed(
            cursorLocation,
            "image",
            `${this.CDN_IMAGE}/${original}`
          );
          resetUploader();
          this.upload.loading = false;
        })
        .catch(error => {
          this.upload = {
            loading: false,
            error: true
          };
        });
    },
    GetImage(e) {
      let img = e.target.files[0];
      this.image = img;
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = e => {
        this.post.coverUrl = e.target.result;
      };
    }
  }
};
</script>

<style scoped>
.compose-submit-spinner {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: #ffffff;
}
.compose-submit-spinner img {
  margin: 70px auto 0 auto;
  display: block;
}
#fixed-btn-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 98%;
  padding: 20px 0;
}
.keetela-card {
  margin: 10px 0;
  width: 98%;
  padding: 1%;
}
.keetela-card .btn {
  margin: 5px;
  padding: 4px 35px;
}

form {
  width: 100%;
}

/* form input[type="text"], */
form #blog-title {
  border: none;
  border-left: 3px solid #989898;
  width: 99%;
  padding-left: 1%;
  font-size: 35px;
  height: fit-content;
  background: transparent !important;
  resize: vertical !important;
}
.textarea {
  overflow-y: hidden;
  resize: vertical;
  border: none;
  border-left: 3px solid #656565;
  margin: 0.5rem 0;
  font-size: 35px;
  background-color: transparent;
  min-height: 40px !important;
  width: 99%;
  padding-left: 1%;
  appearance: none;
}

.grab-alert {
  width: 96%;
  margin: 0 2%;
}

.alert {
  width: 100%;
}

.category {
  margin: 0;
  width: 100%;
  display: block;
}

.category span {
  margin: 0;
  float: left;
  padding: 3px 20px;
  background: #e6e6e6;
  border-radius: 15px;
}
.upload-image {
  background: #e7e7e7;
}
.upload-image label {
  display: block;
  width: 100%;
}
.upload-image label img {
  background: #e7e7e7;
  margin: 0 auto;
  display: block;
  max-width: 150px;
  width: 100%;
}
.upload-cover-image {
  margin: 0 auto;
  display: block;
  max-width: 400px;
  border: none;
  background: none;
  clip: rect(0, 0, 0, 0);
  padding: 0;
  white-space: nowrap;
}
</style>
