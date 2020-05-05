
<template>
  <div>
    <component :is="layout">
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-lg-10">
            <div class="py-1 compose-submit-spinner" v-if="!loaded && article">
              <img src="@/assets/images/spinner.svg" alt="loading" />
            </div>
            <div v-if="loaded && !updated_post.success" class="keetela-card">
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
                <div>
                  <img
                    v-if="article.coverUrl"
                    :src="`${CDN_IMAGE}/c_thumb,h_250,w_500/${article.coverUrl}`"
                    class="card-img-top mb-2"
                    :alt="post.title"
                  />
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
                <div class="py-3 mb-2">
                  <span class="border border-gray py-2 px-4">
                    <icon icon="clock" class="icon" />&nbsp;Written:
                    <b>{{article.createdAt | date}}</b>
                  </span>
                  <span class="border border-gray py-2 px-4 ml-3">
                    <icon icon="clock" class="icon" />&nbsp;Last updated:
                    <b>{{article.updatedAt | date}}</b>
                  </span>
                  <span class="border border-gray py-2 px-4 ml-3">
                    <icon icon="arrow-right" class="icon" />&nbsp;Category:
                    <b>{{article.category}}</b>
                  </span>
                </div>
                <div class="row m-0" v-if="updated_post && updated_post.errors">
                  <div
                    class="alert alert-danger"
                    v-for="error in updated_post.errors"
                    :key="error.index"
                  >{{error}}</div>
                </div>
                <div></div>
                <div id="fixed-btn">
                  <button
                    v-on:click.prevent="updateArticle"
                    class="btn bg-success rounded text-light ml-0"
                  >
                    <icon icon="save" class="icon" />&nbsp;
                    Save
                  </button>

                  <router-link
                    :to="`/dashboard/${accountType}/my-blog`"
                    class="btn bg-dark rounded text-light"
                  >My articles</router-link>
                  <span
                    v-if="loaded && updated_post.loading && !updated_post.success"
                    class="py-2 px-4 bg-danger text-light rounded"
                  >Updating...</span>
                </div>
              </form>
              <div class="clear"></div>
            </div>
            <div
              class="container mb-4 mt-2 text-center"
              v-if="loaded && !updated_post.loading && updated_post.success"
            >
              <div class="row">
                <img
                  src="@/assets/images/content-creator.svg"
                  style="width:350px;margin:0 auto;display:block"
                  alt
                />
              </div>
              <div class="clear"></div>
              <h2 class="text-success my-5">You have successfully edited this article.</h2>
              <div class="my-3">
                <router-link
                  :to="`/post/${updated_post.article.category}/${updated_post.article.slug}`"
                  class="btn bg-dark px-3 rounded text-light"
                >View post</router-link>
                <router-link
                  :to="`/dashboard/${accountType}/my-blog`"
                  class="btn bg-dark px-3 rounded text-light"
                >My articles</router-link>
                <router-link
                  :to="`/dashboard/${accountType}`"
                  class="btn bg-dark px-3 rounded text-light"
                >Dashboard</router-link>
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
import { setResizeListeners } from "@/helpers/TextareaAutoResizer";
import { VueEditor } from "vue2-editor";
import AxiosHelper from "@/helpers/AxiosHelper";
const account_layout = "account";

export default {
  name: "EditBlogPost",
  components: {
    Header,
    VueEditor
  },
  data() {
    return {
      post: {
        body: "",
        title: "",
        coverUrl: null,
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
    article() {
      const fetch_post = this.$store.getters.fetch_post;
      if (fetch_post) {
        this.post = {
          title: fetch_post.article.title,
          body: fetch_post.article.body,
          coverUrl: fetch_post.article.coverUrl
        };
        setTimeout(() => {
          this.loaded = true;
        }, 500);
      }
      return fetch_post.article;
    },
    updated_post() {
      return this.$store.getters.updated_post;
    },
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    },
    ...mapGetters(["updated_post", "fetch_post"])
  },
  watch: {
    "$route.params.slug"(nextSlug, previousSlug) {
      this.FETCH_ONE_POST(nextSlug);
    }
  },
  async mounted() {
    await this.$store.dispatch("FETCH_ONE_POST", this.$route.params.slug);
    setResizeListeners(this.$el, ".js-autoresize");
  },
  methods: {
    updateArticle() {
      this.submitingPost = true;
      this.UPDATE_POST({ post: this.post, slug: this.$route.params.slug });
    },
    ...mapActions(["UPDATE_POST"]),
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      this.upload = {
        loading: true,
        error: false
      };
      var formData = new FormData();
      formData.append("image", file);
      AxiosHelper.post(
        `/upload/coverUrl?slug=${this.$route.params.slug}`,
        formData
      )
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
