<template>
  <div>
    <ul class="nav flex-column mini-nav">
      <li class="nav-item">
        <router-link class="border" :to="'/dashboard/p/subscriptions'">
          <icon class="icon" icon="plug" />Subscriptions
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="border" :to="'/dashboard/p/payments'">
          <icon class="icon" icon="wallet" />Payments History
        </router-link>
      </li>
    </ul>
    <div class="p-4 radius-1 text-center mb-1  bg-blue-gradient">
      <router-link class="font-weight-light text-light" :to="'/tutors'">
        <icon class="icon" icon="user-friends" />
        <span class="px-2">Browser tutors</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "ServiceNav"
};
</script>