
<template>
  <div id="admin-menu" class="my-2">
      <h5>Admin Panel</h5>
      <div class="admin-nav">
        <router-link :to="'/'">
          <icon class="icon" icon="envelope" />Mail
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="users" />Users
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="project-diagram" />Connections
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="child" />Tutorship
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="chart-area" />Performance
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="star" />Reviews
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="sign" />Blog
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="briefcase" />Jobs
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="calendar-alt" />Events
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="question-circle" />FAQs
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="bell" />Notifications
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="bullhorn" />Claims
        </router-link>
        <router-link :to="'/'">
          <icon class="icon" icon="exclamation-circle" />Issues
        </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdminMenu"
};
</script>


<style scoped>
.admin-nav {
  width: 100%;
}
.admin-nav a{
  width: 100%;
  display:block;
  position: relative;
  padding: 10px 10px 10px 30px;
  color:#454545
}
.admin-nav .icon{
  position: absolute;
  left:5px;top:12px;
  color:#989898
}
</style>