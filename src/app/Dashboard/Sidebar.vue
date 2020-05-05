<template>
  <div class="sidebar">
    <p class="py-1">
      <router-link class="app-logo" :to="'/'">
        <img src="@/assets/images/logo_icon_I.svg" />
      </router-link>
    </p>
    <!-- DASHBOARD -->
    <div>
      <router-link :to="'/'">
        <icon class="icon" icon="arrow-left" />
        <span>Back home</span>
      </router-link>
      <router-link :to="`/dashboard/${accountType}`">
        <icon class="icon" icon="stream" />
        <span>Dashboard</span>
      </router-link>
      <router-link :to="`/dashboard/${accountType}/manage`">
        <icon class="icon" icon="folder" />
        <span>Manage</span>
      </router-link>
    </div>
    <!-- TUTOR NAV CARD -->
    <div v-if="accountType === 't'">
      <router-link :to="`/dashboard/${accountType}/services`">
        <icon class="icon" icon="lightbulb" />
        <span>My Services</span>
      </router-link>
      <router-link :to="`/dashboard/${accountType}/tutor-application`">
        <icon class="icon" icon="check" />
        <span>My Application</span>
      </router-link>
      <router-link :to="`/dashboard/${accountType}/coaching`">
        <icon class="icon" icon="layer-group" />
        <span>Tutoring</span>
      </router-link>
    </div>
    <!-- PARENT NAV CARD -->
    <div v-if="accountType === 'p'">
      <router-link :to="`/dashboard/${accountType}/subscriptions`">
        <icon class="icon" icon="plug" />
        <span>Subscriptions</span>
      </router-link>
      <router-link :to="`/dashboard/${accountType}/kids`">
        <icon class="icon" icon="child" />
        <span>Kids</span>
      </router-link>
    </div>

    <!-- GENERAL -->
    <div>
      <router-link :to="`/dashboard/${accountType}/messages`">
        <icon class="icon" icon="envelope" />
        <span>Messages</span>
      </router-link>
      <router-link :to="`/dashboard/${accountType}/my-blog`">
        <icon class="icon" icon="signature" />
        <span>Blog</span>
      </router-link>
      <router-link :to="`/dashboard/${accountType}/settings`">
        <icon class="icon" icon="cog" />
        <span>Settings</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "sidebar",
  computed: {
    profile() {
      return JSON.parse(localStorage.getItem("user"));
    },
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    ...mapActions(["LOGOUT_USER"]),
    logout() {
      this.LOGOUT_USER();
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  width:18%;
}
.sidebar .app-logo {
  width: 100%;
}
.sidebar .app-logo a {
  padding: 0!important;
  margin: 0!important;
}
.sidebar .app-logo img {
  width: 45px;
}
.sidebar a {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px 20px 10px 50px;
  position: relative;
  font-weight: 100;
  color: #ececec;
}
.sidebar a .icon {
  position: absolute;
  top: 13px;
  left: 22px;
  color: #8786c8;
}
.sidebar a:hover .icon {
  color: #ffffff;
}
.is-active {
  position: relative;
  color: #ffffff;
  font-weight: 800;
  display: block;
  background: #ffffff;
  color: #403ea8!important;
  border-radius: 0 25px 25px 0 !important;
}
.is-active::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 100%;
  content: "";
  background: #ffffff;
}
.is-active .icon {
  color: #403ea8!important;
}
</style>
