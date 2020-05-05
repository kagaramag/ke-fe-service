<template>
  <div>
    <component :is="layout">
      <div class="mx-4 px-2">
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3">
            <Nav />
          </div>
          <div class="col-sm-12 col-md-9 col-lg-9">
            <div class="row" v-if="fetch_services && fetch_services.services">
              <div
                class="col-sm-12 mt-3"
                v-for="service in fetch_services.services"
                :key="service.index"
              >
                <div
                  class="row no-gutters border bg-white rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
                >
                  <div class="col-sm-3">
                    <div class="image my-3 mx-1">
                      <img src="@/assets/images/service-list.svg" alt />
                    </div>
                  </div>
                  <div class="col-sm-9 p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-success">{{service.type | capitalize }}</strong>
                    <h2 class="mb-0">{{service.name}}</h2>
                    <div>
                      Price:
                      <strong>{{service.price}}</strong>
                    </div>
                    <div>
                      <b>Allow discount</b>
                      : {{service.discountable ? 'Yes' : 'No' }}
                    </div>
                    <div class="mb-1 text-muted">{{service.createdAt | date}}</div>
                  </div>
                <div class="divider bg-gray"></div>
                <div class="p-3 border border-light text-center ">No subscribed customers yet</div>
                </div>
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
import { mapGetters, mapActions } from "vuex";
import Nav from "./Nav";
const account_layout = "account";
export default {
  name: "DashboardServicesIndex",
  props: ["data"],
  components: {
    Nav
  },
  data() {
    return {
      loaded: false
    };
  },

  mounted() {
    this.FETCH_SERVICES();
    this.loaded = true;
  },
  computed: {
    fetch_services() {
      return this.$store.getters.fetch_services;
    },
    ...mapGetters(["fetch_services"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    ...mapActions(["FETCH_SERVICES"])
  }
};
</script>

<style scoped>
</style>
