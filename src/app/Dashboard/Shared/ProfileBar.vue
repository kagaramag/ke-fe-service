<template>
  <div id="profile-card" class="p-3 mb-2 bg-primary" slot-scope="data">
    <div class="py-1">
      <div class="container">
        <div class="row text-white" style="position:relative">
          <div class="col-sm-3 col-md-3 col-lg-2">
            <div class="wrap-profile image">
              <img
                :src="data && data.user.image ? data.user.image : avatar"
                class="bg-light rounded-circle ui-w-100 profile mx-auto shadow-3"
                :alt="data.user.firstName || ''"
              />
            </div>
          </div>
          <div class="col-sm-9 col-md-9 col-lg-10">
            <div>
              <h3 class style="font-size:30px;">
                <span class="float-left">{{data.user.lastName}} {{data.user.firstName}}</span>
                <span
                  class="float-right"
                  v-if="accountType == 'p' && data.user.UserRole && data.user.UserRole.role.role == 'tutor'"
                >
                  <button
                    @click="addToCart('tutor', `${data.user.firstName} ${data.user.lastName}`, data.user.username || NULL )"
                    class="btn btn-light border border-dark rounded px-4 shadow"
                  >
                    <icon class="icon" icon="handshake" />&nbsp;&nbsp;Hire me
                  </button>
                  <router-link
                    :to="`dashboard/${accountType}/message/${data.user.username}`"
                    class="btn btn-light border border-dark rounded px-4 shadow"
                  >
                    <icon class="icon" icon="envelope" />&nbsp;&nbsp;Message
                  </router-link>
                </span>
              </h3>
              <div class="clear"></div>
              <div class="pt-3">
                <span
                  class="mr-3 role radius-1"
                  v-if="accountType === 't'"
                >{{data.user.UserRole.role.role | capitalize}}</span>
                <span class="mr-3" v-if="data.location">
                  <icon class="icon" icon="map-marker-alt" />
                  &nbsp;
                  {{data.location.province}}, {{data.location.district}}
                </span>
                <span class="mr-3">
                  <icon class="icon" icon="clock" />&nbsp;
                  <b>Joined</b>
                  {{data.user.createdAt | date}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProfileBar",
  props: ["data"],
  data() {
    return {
      loaded: false,
      role: {
        name: "",
        image: ""
      }
    };
  },
  computed: {
    fetch_cart() {
      return this.$store.getters.fetch_cart;
    },
    auth() {
      return JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {
    addToCart(type, name, username) {
      const data = {
        type,
        name,
        username
      };
      this.ADD_TO_CART(data);
    },
    ...mapActions(["ADD_TO_CART"])
  }
};
</script>

<style scoped>
#profile-card {
  position: relative;
}
#profile-card::before {
  position: absolute;
  content: "";
  width: 90%;
  height: 6px;
  background: #b8b8b8;
  bottom: -6px;
  left: 5%;
  border-radius: 0 0 5px 5px;
}
#profile-card::after {
  position: absolute;
  content: "";
  width: 80%;
  height: 6px;
  background: #dbdbdb;
  bottom: -12px;
  left: 10%;
  border-radius: 0 0 5px 5px;
}
.role {
  padding: 3px 8px;
  border: 1px solid #fefefe;
}
.wrap-profile {
  top: 0;
  left: 0;
  max-width: 160px;
  height: auto;
}

.profile-nav {
  border-top: #ebebeb 2px solid;
  width: 100%;
  display: inline-block;
  margin: 0;
  padding: 10px 0;
}

.profile-nav li {
  display: inline-block;
  list-style-type: none;
}

.profile-nav li a {
  margin: 7px 10px 7px 0 !important;
  /* color: #343434; */
}

.loaded {
  display: none;
}

.profile {
  max-width: 120px;
  height: auto;
}

.rounded-circle.profile {
  border: 4px solid #ffffff;
}

.nav .icon {
  margin-right: 5px;
}

.nav .nav-link {
  font-weight: 100;
}

.nav .nav-link.active {
  color: #484a52;
  font-weight: 600;
}

.tabs-alt.nav-tabs .nav-link.active,
.tabs-alt.nav-tabs .nav-link.active:hover,
.tabs-alt.nav-tabs .nav-link.active:focus,
.tabs-alt > .nav-tabs .nav-link.active,
.tabs-alt > .nav-tabs .nav-link.active:hover,
.tabs-alt > .nav-tabs .nav-link.active:focus {
  -webkit-box-shadow: 0 -2px 0 #26b4ff inset;
  box-shadow: 0 -2px 0 #26b4ff inset;
}

.nav-tabs:not(.nav-fill):not(.nav-justified) .nav-link,
.nav-pills:not(.nav-fill):not(.nav-justified) .nav-link {
  margin-right: 0.125rem;
}

.nav-tabs.tabs-alt .nav-link,
.tabs-alt > .nav-tabs .nav-link {
  border-width: 0 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
}

.nav-tabs .nav-link.active {
  border-bottom-color: #fff;
}
</style>
