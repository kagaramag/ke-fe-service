<template>
  <div id="account">
    <div v-if="loaded && fetch_user.loading" class="grab-page-loading"></div>
    <div v-if="loaded && fetch_user && !fetch_user.loading">
      <div class="app-wrapper">
        <div class="sidebar-wrapper bg-primary">
          <Sidebar :user="fetch_user.user" />
        </div>
        <div class="content-wrapper">
          <Header />
          <div class="p-1 mt-3">
            <Cart v-if="!hiringPage" />
            <slot :fetch_user="fetch_user" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Header from "@/components/commons/HeaderAdmin";
import Footer from "@/components/commons/Footer";
import Cart from "@/components/commons/Cart";
import Sidebar from "@/app/Dashboard/Sidebar";
import AdminMenu from "@/app/Dashboard/AdminMenu";
import ProfileBar from "@/app/Dashboard/Shared/ProfileBar";

export default {
  name: "accountLayout",
  components: {
    Header,
    Sidebar,
    ProfileBar,
    Footer,
    AdminMenu,
    Cart
  },
  data() {
    return {
      loaded: false,
      componentKey: 0,
      hiringPage: false
    };
  },
  created() {
    const route = this.$route.path;
    if (route.substring(0, 20) === "/dashboard/p/hiring/") {
      this.hiringPage = true;
    }
    this.loaded = true;
  },
  mounted() {
    if (
      localStorage.getItem("user") ||
      localStorage.getItem("isAuth") ||
      localStorage.getItem("token")
    ) {
      this.FETCH_USER(JSON.parse(localStorage.getItem("user")).username);
    } else {
      this.$store.dispatch("LOGOUT_USER");
    }
    this.loaded = true;
  },
  computed: {
    fetch_user() {
      return this.$store.getters.fetch_user;
    },
    ...mapGetters(["fetch_user"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    logout() {
      this.LOGOUT_USER();
    },
    ...mapActions(["LOGOUT_USER", "FETCH_USER"])
  }
};
</script>

<style scoped>
.app-wrapper {
  display: grid;
  grid-template-columns: 18% 82%;
  grid-template-areas: "sidebar content";
  grid-gap: 0;
  padding: 0;
}

.sidebar-wrapper {
  grid-area: sidebar;
  grid-column: 1;
  min-height: 100vh;
  height: 100%;
}

.content-wrapper {
  grid-area: content;
  background-color: #f3f3f3;
}
header.navbar {
  background: #ffffff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.14);
}

.bio {
  font-weight: 100;
  font-size: 18px;
  color: #565656;
}

.nav .icon {
  margin-right: 5px;
}

.nav .nav-link {
  color: #81828b;
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
