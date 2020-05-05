<template>
  <div>
    <nav class="navbar bg-primary sticky-top m-0 p-0 navbar-expand-lg">
      <div class="container my-0">
        <router-link class="navbar-brand" :to="'/'">
          <img src="@/assets/images/logo_XII.svg" />
        </router-link>
        <button
          ref="button"
          class="toggle-button border-0 p-1 mx-2 bg-transparent text-white d-lg-none"
          style="font-size:25px"
          @click="OpenNavBar()"
        >
          <icon class="icon" icon="bars" />
        </button>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav main-nav float-right mt-2 pt-2 mt-lg-0 ml-4">
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="'/'">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="'/codingclass'">Coding Class</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="'/tutoring'">Tutoring</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="'/mentoring'">Mentoring</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="'/training'">Training</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="'/blog'">Blog</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :to="'/contact'">Contact</router-link>
            </li>
          </ul>
          <div class="float-right"></div>
        </div>
      </div>
    </nav>
    <div class="grab-nav-bar" v-if="showPopup">
      <button
        class="border-0 p-1 mx-2 bg-transparent text-white d-lg-none"
        style="font-size:25px"
        @click="CloseNavBar()"
      >
        <icon class="icon" icon="times" />
      </button>
      <div class="nav-bar mx-auto">
        <ul class="list-group text-center list-group-flush">
          <li class="list-group-item">
            <router-link class="text-white" :to="'/'">Home</router-link>
          </li>
          <li class="list-group-item">
            <router-link class="text-white" :to="'/codingclass'">Coding Class</router-link>
          </li>
          <li class="list-group-item">
            <router-link class="text-white" :to="'/tutoring'">Tutoring</router-link>
          </li>
          <li class="list-group-item">
            <router-link class="text-white" :to="'/mentoring'">Mentoring</router-link>
          </li>
          <li class="list-group-item">
            <router-link class="text-white" :to="'/training'">Training</router-link>
          </li>
          <li class="list-group-item">
            <router-link class="text-white" :to="'/blog'">Blog</router-link>
          </li>
          <li class="list-group-item">
            <router-link class="text-white" :to="'/contact'">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["maxHeader"],
  data() {
    return {
      showPopup: false,
    };
  },
  created(){
    document.documentElement.style.overflow = "auto";
  },
  computed: {
    profile() {
      return JSON.parse(localStorage.getItem("user")) || null;
    },
    ...mapGetters(["auth"])
  },
  methods: {
    CloseNavBar() {
      this.showPopup = false;
      document.documentElement.style.overflow = "auto";
    },
    OpenNavBar() {
      this.showPopup = true;
      document.documentElement.style.overflow = "hidden";
      return;
    }
  }
};
</script>

<style scoped>
.navbar-nav.main-nav a {
  transition: 0.3s;
  font-weight: 300;
}
.navbar-nav.main-nav .nav-item {
  padding-left: 5px !important;
  padding-right: 5px !important;
  position: relative;
}

.navbar-nav.main-nav li:before {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  top: 8px;
  left: 0;
  content: "";
  width: 1px;
  height: 26px;
}

.navbar-nav.main-nav li:nth-child(1):before {
  background: none;
}

@media only screen and (max-width: 991px) {
  .navbar-brand {
    margin-left: 10px !important;
  }
}
.grab-nav-bar {
  background: #403ea8;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 300000;
  top: 0;
  left: 0;
}
.grab-nav-bar button {
  position: absolute;
  top: 5px;
  right: 5px;
}
.nav-bar {
  position: relative;
  margin-top: 60px;
  max-width: 450px;
}
.nav-bar .list-group li {
  background: none !important;
}
</style>
