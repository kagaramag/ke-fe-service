<template>
  <nav class="navbar bg-white shadow sticky-top m-0 py-0 navbar-expand-lg">
    <button
      ref="button"
      class="toggle-button border-0 p-1 mx-2 bg-transparent text-white d-lg-none"
      style="font-size:25px"
      @click="showPopup = !showPopup"
    >
      <icon class="icon" icon="bars" />
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav main-nav mr-auto mt-lg-0 right">
        <li class="nav-item">
          <router-link class="nav-link text-black font-weight-light h5 my-0" :to="'/'"><icon class="icon" icon="home" /> &nbsp;</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-black font-weight-light h5 my-0" :to="'/'"><icon class="icon" icon="stream" /> &nbsp; Dashboard</router-link>
        </li>
      </ul>
      <ul class="navbar-nav right" v-if="auth && auth.isAuth">
        <div>
          <ul class="list-inline">
            <li class="list-inline-item">
              <span v-if="profile">
                <router-link class="text-black" :to="`/dashboard/${accountType}/settings`">
                  {{profile.firstName | truncate(10)}}
                  <img
                    :src="profile.image ? profile.image : avatar"
                    class="bg-light rounded-circle ui-w-30 profile mt-2 mx-auto"
                    :alt="profile.firstName"
                  />
                </router-link>
              </span>
            </li>
          </ul>
        </div>
      </ul>
      <div class="float-right"></div>
    </div>

    <div
      v-show="showPopup"
      v-closable="{
        exclude: ['button'],
        handler: 'onClose'
      }"
      class="sidebar"
    >
      <ul>
        <li>
          <router-link :to="'/'">
            <icon class="icon" icon="stream" />Home
          </router-link>
        </li>
        <li>
          <router-link :to="'/tutors'">
            <icon class="icon" icon="user-friends" />Tutors
          </router-link>
        </li>
        <li>
          <router-link :to="'/blog'">
            <icon class="icon" icon="signature" />Blog
          </router-link>
        </li>
        <li>
          <router-link class="btn btn-light mx-2 px-3 rounded" :to="'/tutors/apply'">
            <icon class="icon" icon="signature" />Become a tutor
          </router-link>
        </li>
        <li class="divider"></li>
        <li v-if="accountType === 't'">
          <router-link :to="'/dashboard/t'">
            <icon class="icon" icon="rocket" />Dashboard
          </router-link>
        </li>
        <li v-if="accountType === 'p'">
          <router-link :to="'/dashboard/p'">
            <icon class="icon" icon="rocket" />Dashboard
          </router-link>
        </li>
        <li v-if="accountType === 'n'">
          <router-link :to="'/dashboard/n'">
            <icon class="icon" icon="rocket" />Dashboard
          </router-link>
        </li>
        <li v-if="accountType === 'l'">
          <router-link :to="'/dashboard/l'">
            <icon class="icon" icon="rocket" />Dashboard
          </router-link>
        </li>
        <li v-if="accountType === 'a'">
          <router-link :to="'/dashboard/a'">
            <icon class="icon" icon="rocket" />Dashboard
          </router-link>
        </li>
        <li class="divider"></li>
        <li>
          <router-link :to="'/login'">
            <icon class="icon" icon="arrow-right" />Login
          </router-link>
        </li>
        <li>
          <router-link :to="'/register'">
            <icon class="icon" icon="plus" />Register
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

let handleOutsideClick;
Vue.directive("closable", {
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;

      let clickedOnExcludedEl = false;
      exclude.forEach(refName => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName];
          //clickedOnExcludedEl = excludedEl.contains(e.target || null);
        }
      });
      if (el.contains && !el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
  },
  unbind() {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  }
});

export default {
  props: ["maxHeader"],
  data() {
    return {
      showPopup: false
    };
  },
  computed: {
    auth() {
      return JSON.parse(localStorage.getItem("auth")) || null;
    },
    cart() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    },
    profile() {
      return JSON.parse(localStorage.getItem("user")) || null;
    },
    ...mapGetters(["auth"])
  },
  methods: {
    onClose() {
      this.showPopup = false;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 300px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.4);
  height: 100%;
  overflow-y: scroll;
  z-index: 1200;
}
.sidebar ul {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  float: left;
}
.sidebar ul li {
  display: block;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 17px 15px 17px 50px;
  border-bottom: 1px solid #efefef;
}
.sidebar ul li .icon {
  position: absolute;
  left: 18px;
  top: 20px;
  color: #505050;
}
.sidebar ul li a {
  color: #1d1d1d;
}
.sidebar ul li.divider {
  padding: 0px 0 !important;
  margin: 10px 0;
  border-bottom: 0px solid #ffffff !important;
  background: transparent;
}

.bg-primary.text-light {
  padding: 6px 20px;
}

.profile {
  position: relative;
  top: 4px;
  width: 30px;
}
.rounded-circle.profile {
  border: 2px solid #ffffff;
}
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
</style>
