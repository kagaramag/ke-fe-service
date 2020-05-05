<template>
  <div>
    <div class="p-4 radius-2 shadow-1 text-center my-3 bg-white">
      <router-link :to="'/dashboard/t/services/create'">
        <icon class="icon" icon="plus" />
        <div>Create service</div>
      </router-link>
    </div>
    <ul class="nav flex-column mini-nav">
      <li class="nav-item">
        <router-link :to="'/dashboard/t/services'">
          <icon class="icon" icon="lightbulb" />Services
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="'/dashboard/t/services/payments'">
          <icon class="icon" icon="wallet" />Payments
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