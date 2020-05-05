<template>
  <div>
    <component :is="layout">
      <div class="mx-4 px-2">
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3">
            <Nav />
          </div>
          <div class="col-sm-12 col-md-9 col-lg-9">
            <div v-if="fetch_subscriptions && fetch_subscriptions.subscriptions">
              <div
                class="card rounded shadow-sm mb-3"
                v-for="(subscription, index) in fetch_subscriptions.subscriptions"
                :key="index"
              >
                <div class="card-body">
                  <h6 class="card-title">
                    Service status
                    <span class="badge badge-warning py-1 px-2 rounded">Inactive</span>
                  </h6>
                  <h5 class="card-title">{{subscription.service.name}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    <span>{{subscription.service.type | capitalize}}</span>
                  </h6>
                  <div class="card-text">{{subscription.kid.names}}</div>
                  <div class="card-text">
                    Expires:
                    <span class="text-danger">{{subscription.endingDate | date}}</span>
                  </div>
                  <div class="my-3">
                    <router-link :to="'/'" class="btn border-primary rounded px-4">Details</router-link>
                    <router-link :to="'/'" class="btn border-success rounded px-4">Renewal subscribe now</router-link>
                  </div>
                </div>
              </div>
            </div>
            <!-- IF ERROR OCCURED WHILE RETRIEVING -->
            <!-- <div
              v-if="loaded && fetch_subscriptions && fetch_subscriptions.errors && !fetch_subscriptions.loading  && !fetch_subscriptions.success"
            >
              <div
                class="alert alert-danger"
                v-for="(error, index) in fetch_subscriptions.errors"
                :key="index"
              >{{error}}</div>
            </div>-->
            <!-- IF NO SUBSCRIPTION FOUND -->
            <div
              v-if="loaded && fetch_subscriptions && !fetch_subscriptions.subscriptions.length && fetch_subscriptions.errors && !fetch_subscriptions.loading  && !fetch_subscriptions.success"
            >
              <NotFound
                message="No subscriptions found"
                description="You did not subscribe to any tutorship service yet"
                icon="blog"
                link="/tutors"
                linkText="Search and hire a tutor"
              />
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>
<script>
import Vue from "vue";
import NotFound from "@/app/NotFound/ContentNotFound";
import { mapGetters, mapActions } from "vuex";
import Nav from "./Nav";
const account_layout = "account";
export default {
  name: "DashboardSubscriptionsIndex",
  components: {
    Nav,
    NotFound
  },
  data() {
    return {
      loaded: false
    };
  },
  created() {
    this.loaded = true;
  },
  mounted() {
    this.fetchSubscriptions();
  },
  computed: {
    fetch_subscriptions() {
      return this.$store.getters.fetch_subscriptions;
    },
    ...mapGetters(["fetch_subscriptions"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    ...mapActions(["fetchSubscriptions"])
  }
};
</script>

<style scoped>
</style>
