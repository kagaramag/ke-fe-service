<template>
  <div id="my-kids">
    <div v-if="fetch_kids.kids && fetch_kids.kids.length">
      <h2 class="my-2">Tutoring</h2>
      <!-- LIST OF KIDS -->
      <ul class="list-unstyled" v-if="fetch_kids.kids">
        <li
          class="my-4 shadow-1 bg-white wrap-one-tutoring"
          v-for="val in fetch_kids.kids"
          :key="val.index"
        >
          <div v-if="val.status ==='requested'" class="requested" />
          <div v-if="val.status ==='accepted' || val.status ==='request_cancel'" class="accepted" />
          <div v-if="val.status ==='rejected'" class="rejected" />
          <div v-if="val.status ==='terminated'" class="terminated" />
            <div class="row">
              <div class="media p-3 my-1 mx-3" style="position:relative">
                <div class="media-body px-3">
                  <!-- REQUESTED -->
                  <div v-if="val.status === 'requested'" class="mb-3">
                    <div class="py-2 md-text">
                      <div class="my-2 timestamp">{{val.createdAt | date }}</div>
                      <b>{{val.kid.parent.lastName}} {{val.kid.parent.firstName}}</b> requested you to tutor
                      <b>{{val.kid.names}}</b>
                      , {{val.kid.parent.gender === 'male' ? 'his' : 'her'}} {{val.kid.dateOfBirth | age }}-years old child.
                    </div>
                    <div>
                      <router-link
                        :to="`/profile/${profile.user.username}/tutoring/${val.id}`"
                        class="btn btn-outline-success text-success rounded px-4"
                      >
                        Go to tutorship
                        <icon class="icon" icon="arrow-right" />
                      </router-link>
                      <button
                        @click.prevent
                        @click="accept_request(val.kid.id)"
                        class="btn btn-outline-success rounded shadow-none px-4"
                      >Accept</button>
                      <button class="btn btn-outline-danger rounded px-4 shadow-none">Reject</button>
                    </div>
                  </div>
                  <!-- ACCEPTED -->
                  <div v-if="val.status === 'accepted' || val.status === 'request_cancel'" class="mb-3">
                    <div class="py-2 md-text">
                      <div class="my-2 timestamp">{{val.createdAt | date }}</div>You are connected with
                      <b>{{val.kid.names}}</b>
                      , a {{val.kid.dateOfBirth | age }}-years old child of
                      <b>{{val.kid.parent.lastName}} {{val.kid.parent.firstName}}</b>.
                    </div>
                    <div>
                      <router-link
                        :to="`/profile/${profile.user.username}/tutoring/${val.id}`"
                        class="btn btn-outline-success text-success rounded px-4"
                      >
                        Go to tutorship
                        <icon class="icon" icon="arrow-right" />
                      </router-link>
                    </div>
                  </div>
                  <!-- REJECTED -->
                  <div v-if="val.status === 'rejected'" class="mb-3">
                    <div class="py-2 md-text">
                      <div class="my-2 timestamp">{{val.createdAt | date }}</div>You have rejected the request of
                      <b>{{val.kid.parent.lastName}} {{val.kid.parent.firstName}}</b>
                      to
                      tutor {{val.kid.parent.gender === 'male' ? 'his' : 'her'}} kid
                      <b>{{val.kid.names}}</b>
                      <b>{{val.kid.parent.firstName}}</b>
                    </div>
                  </div>
                  <!-- TERMINATED -->
                  <div v-if="val.status === 'terminated'" class="mb-3">
                    <div class="py-2 md-text text-danger">
                      <div class="my-2 timestamp">{{val.createdAt | date }}</div>The tutorship between
                      <b>{{val.kid.names}}</b> and
                      <b>you</b> has been terminated
                      <br />

                      <b>Parent: {{val.kid.parent.firstName}} {{val.kid.parent.lastName}}</b>
                      <div class="text-dark mt-3">
                        <router-link class="bold" :to="'/'">
                          <icon class="icon" icon="arrow-right" />Learn more
                        </router-link>about Tutorship Policy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </li>
      </ul>
    </div>
    <div v-if="loaded && !fetch_kids.kids.length">
      <div class="media">
        <img
          style="max-width:240px;"
          class="d-block mx-3 ui-w-100 profile d-block mx-auto"
          src="@/assets/images/school-kid.png"
          alt="Lost Kid"
        />
      </div>
      <h2 class="text-center my-4">Oooops, You dont have kid to tutor yet!</h2>
      <div class="text-center">Learn how you can connect yourself with kids and parents.</div>
    </div>
    <!-- MODAL, VIEW A KID -->
    <b-modal id="view-kid" hide-footer>
      <template class="bg-danger" v-slot:modal-title>
        <b>Kid information</b>
      </template>
      <div class="my-3">
        <h5 class="bold">Kid</h5>
        <ul class="list-group" v-show="kidInfoPreview && kidInfoPreview">
          <li class="list-group-item">
            <b>Names:</b>
            <span class="capitalize">{{kidInfoPreview.id}}</span>
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
        <router-link class="btn btn-outline-dark rounded px-4">Search tutors</router-link>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
const account_layout = "account";
export default {
  name: "MyKids",
  props: ["profile", "fetch_kids"],
  data() {
    return {
      loaded: false,
      kidInfoPreview: {}
    };
  },
  mounted() {
    this.FETCH_KIDS();
    this.loaded = true
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
    fetch_kids() {
      return this.$store.getters.fetch_kids;
    },
    ...mapGetters(["fetch_kids"]),
  },
  methods: {
    // pop kid info
    async popKidInfo(kid) {
      this.kidInfoPreview = "";
      await this.$bvModal.show("view-kid");
      this.kidInfoPreview = kid;
    },
    accept_request(id) {
      this.ACCEPT_REQUEST({ tuteeId: id });
    },
    ...mapActions(["ACCEPT_REQUEST", "FETCH_KIDS"])
  }
};
</script>


<style scoped>
.wrap-one-tutering:hover {
  background: #f2f4f5 !important;
}
</style>
