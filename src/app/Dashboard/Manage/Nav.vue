<template>
  <div>
    <div class="p-4 radius-1 text-center mb-3 bg-primary">
      <router-link class="font-weight-light text-light" :to="'/dashboard/p/manage'">
        <span class="px-2">Manage</span>
      </router-link>
    </div>
    <ul class="nav flex-column mini-nav">
      <li class="nav-item">
        <router-link class="border" :to="'/dashboard/p/manage/tutors'">
          <icon class="icon" icon="user" />Tutors
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="border" :to="'/dashboard/p/manage/mentors'">
          <icon class="icon" icon="user" />Mentors
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ServiceNav"
};
</script>