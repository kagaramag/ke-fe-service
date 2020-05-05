<template>
  <div id="thread">
    
    <div v-if="tutoring_messages.tutoring">
      <div
        class="mb-3 wrap-one-tutering"
        v-for="message in tutoring_messages.tutoring.tutorship"
        :key="message.id"
      >
        <div class="row">
          <div class="media mx-2" style="position:relative">
             <img
                :src="message.receiver.image ? message.receiver.image : avatar"
                class="bg-light rounded-circle ui-w-100 profile mt-2 mx-auto shadow-3"
                :alt="profile.user.firstName"
              />
            <span v-if="message.receiver.image">
              <img
                :src="message.receiver.image"
                style="max-width:40px;"
                class="d-block mx-3 ui-w-100 rounded-circle profile d-block mx-auto"
                alt="Tutor"
              />
            </span>
            <span v-else>
              <img
                src="@/assets/images/profile.png"
                style="max-width:40px;"
                class="d-block mx-3 ui-w-100 rounded-circle profile d-block mx-auto"
                alt="Tutor"
              />
            </span>
            <div class="media-body px-3">
              <span v-if="profile.user.id === message.receiver.id">
                <h5 class="py-3" style="font-size:18px">
                  <b>Me</b>
                  <span class="float-right timestamp">
                    <icon class="icon" icon="clock" />
                    {{message.createdAt | date}}
                  </span>
                </h5>
              </span>
              <span v-else>
                <h5 class="py-3" style="font-size:18px">
                  <b>{{message.receiver.lastName}} {{message.receiver.firstName}}</b>

                  <span class="py-1 px-2 bg-light border border-dark rounded">
                    {{message.kid.names}}
                    <icon class="icon bold" icon="arrow-alt-circle-right" />
                  </span>
                  <span class="float-right timestamp">
                    <icon class="icon" icon="clock" />
                    {{message.createdAt | date}}
                  </span>
                </h5>
              </span>
              <div class="body-message" v-html="message.message"></div>
            </div>
          </div>
        </div>
        <div class="divider my-3"></div>
      </div>
    </div>
    <div class="py-4" v-if="tutoring_messages.tutoring && !tutoring_messages.tutoring.length">
      <h4>Under construction...</h4>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";
export default {
  name: "thread",
  props: ["profile"],
  mounted() {
    this.FETCH_TUTORING_MESSAGES(this.$route.params.id);
  },
  computed: {
    tutoring_messages() {
      return this.$store.getters.tutoring_messages;
    }
  },
  methods: {
    ...mapActions(["FETCH_TUTORING_MESSAGES"])
  }
};
</script>

<style scoped>
.wrap-one-tutering h3{
  font-weight: 700
}
.kid-info {
  border-color: #e4e4e4!important
}
.body-message b {
  font-weight: 700;
}
.body-message p a {
  background: #cdcdcd;
  color:#135fa7!important
}
</style>