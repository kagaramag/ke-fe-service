<template>
  <div>
    <component :is="layout">
      <div class="mx-4 px-2">
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3">
            <Nav />
          </div>
          <div class="col-sm-12 col-md-9 col-lg-9">
            <div class="p-3 bg-white">
              <form method="post">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="service.name"
                    class="form-control"
                    id="name"
                    placeholder="Service name..."
                    autocomplete="off"
                  />
                </div>
                <div class="form-row align-items-center">
                  <div class="col-auto">
                    <input
                      type="text"
                      class="form-control mb-2"
                      id="inlineFormInput"
                      placeholder="Price"
                    />
                  </div>
                  <div class="col-auto">
                    <div class="input-group mb-2">
                      <div class="input-group-prepend">
                        <div class="input-group-text">per</div>
                      </div>
                      <input
                        type="input"
                        class="form-control"
                        id="inlineFormInputGroup"
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="mb-2">
                      <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                        <option selected>Choose...</option>
                        <option value="1" selected>hour</option>
                        <option value="2">week</option>
                        <option value="3">month</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <vue-editor
                    id="editor"
                    useCustomImageHandler
                    v-model="service.description"
                    :editorToolbar="toolbar"
                  ></vue-editor>
                </div>
                <div class="row m-0" v-if="fetch_service && fetch_service.errors">
                  <div
                    class="alert alert-danger"
                    v-for="error in fetch_service.errors"
                    :key="error.index"
                  >{{error}}</div>
                </div>
                <div id="fixed-btn">
                  <button
                    v-on:click.prevent="save"
                    class="btn bg-success rounded text-light ml-0"
                  >Create service</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Nav from "./Nav";
import editor from "vue2-medium-editor";
import "@/assets/css/medium-editor.min.css";
import "@/assets/css/flat.min.css";
import TextareaAutosize from "vue-textarea-autosize";
import { setResizeListeners } from "@/helpers/TextareaAutoResizer";
import { VueEditor } from "vue2-editor";
const account_layout = "account";
Vue.use(TextareaAutosize);
export default {
  name: "DashboardHome",
  props: ["data"],
  components: {
    VueEditor,
    Nav
  },
  data() {
    return {
      loaded: false,
      serviceForm: false,
      submitingPost: false,
      service: {
        name: "",
        description: "",
        price: ""
      },
      toolbar: [["bold", "italic", "underline", "strike"], ["link"]]
    };
  },

  mounted() {
    this.loaded = true;
    setResizeListeners(this.$el, ".js-autoresize");
  },
  computed: {
    fetch_service() {
      const post = this.$store.getters.fetch_service;
      return post;
    },
    ...mapGetters(["fetch_service"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    openServiceForm() {
      this.serviceForm = !this.serviceForm;
    },
    save() {
      this.submitingPost = true;
      const data = {
        name: this.service.name,
        description: this.service.description,
        price: this.service.price,
        type: this.service.type || "tutoring"
      };
      this.CREATE_SERVICE(data);
    },
    ...mapActions(["CREATE_SERVICE"])
  }
};
</script>
