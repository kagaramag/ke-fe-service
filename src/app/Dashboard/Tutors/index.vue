<template>
  <div>
    <div class="text-center p-3 mb-4">
      <h4 class="my-2">Update your account</h4>
      <div class="my-2">Be trustworthy. Your customers need to know more more about you.</div>
      <div class="my-3">
        <router-link
          :to="`/dashboard/${accountType}/tutor-application`"
          class="btn bg-primary px-3 mr-1 mb-2 rounded text-light"
        >
          <icon icon="check" class="icon" />
          &nbsp;
          My Application
        </router-link>
        <router-link
          :to="`/dashboard/${accountType}/settings`"
          class="btn bg-secondary px-3 mr-1 mb-2 rounded text-light"
        >
          <icon icon="cog" class="icon" />
          &nbsp;
          Settings
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardTutorBox"
};
</script>