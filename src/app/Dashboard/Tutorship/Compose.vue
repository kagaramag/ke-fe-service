<template>
  <div id="compose" >
    <div class="mb-4 shadow py-3 px-4 bg-white wrap-one-tutering">
      <form @submit.prevent>
        <div>
          <button type="submit" class="btn rounded border border-light">
            <icon class="icon" icon="envelope" /> Message
          </button>
          <button type="submit" class="btn rounded border border-light">
            <icon class="icon" icon="comment-dots" /> Review
          </button>
        </div>
        <div class="form-group py-3">
          <medium-editor
            :text="info.message"
            :options="options"
            custom-tag="div"
            v-on:edit="applyTextEdit"
          />
        </div>
        <div class="my-3">
          <button type="submit" class="btn">
            <icon class="icon" icon="link" />
          </button>
          <button type="submit" class="btn">
            <icon class="icon" icon="file" />
          </button>
          <button type="submit" class="btn">
            <icon class="icon" icon="camera" />
          </button>
          <button
            type="submit"
            @click.prevent
            @click="submit_tutoring"
            class="btn border border-dark float-right rounded px-4"
          >Send</button>
          <div class="float-right px-3">
            <b-spinner v-if="false"></b-spinner>
          </div>
        </div>
        <div class="clear"></div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import editor from "vue2-medium-editor";
import "@/assets/css/medium-editor.min.css";
import "@/assets/css/flat.min.css";
const account_layout = "account";
export default {
  name: "compose",
  props: ['profile', 'tutoring'],
  components: {
    "medium-editor": editor
  },
  data() {
    
    return {
      info: {
        receiverId: 1,
        message: "",
        tuteeId: this.tutoring.tutoring.kid.id,
        messageType: "forParent",
        tutoringId: parseInt(this.$route.params.id)
      },
      options: {
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: ["bold", "italic", "underline", "quote", "anchor"]
        }
      }
    };
  },
  mounted() {
    
  },
  computed: {
    // profile() {
    //   return this.$store.getters.profile;
    // },
    // fetch_one_tutoring() {
    //   return this.$store.getters.fetch_one_tutoring;
    // },
    // compose_tutoring() {
    //   return this.$store.getters.compose_tutoring;
    // },
    // ...mapGetters(["compose_tutoring", "profile", "fetch_one_tutoring"])
  },
  methods: {
    async submit_tutoring() {
      await this.COMPOSE_TUTORING(this.info);
    },
    ...mapActions(["COMPOSE_TUTORING"]),
    applyOptions(ev) {
      try {
        this.options = JSON.parse(ev.target.value);
        this.optionsValid = true;
      } catch (e) {
        this.optionsValid = false;
      }
    },
    applyTextEdit(ev) {
      if (ev.event.target) {
        this.info.message = ev.event.target.innerHTML;
      }
    },
    // ...mapActions(["GET_PROFILE"])
  },
};
</script>

<style scoped>
.kid-info {
  border: 1px solid #efefef;
}
.border-light{
  border-color: #e4e4e4!important
}
</style>