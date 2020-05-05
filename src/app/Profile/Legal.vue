<template>
  <div class="shadow-2  bg-white radius-2 p-3 mt-4" slot-scope="user">
    <h4 class="my-2">Legal document</h4>
    <div
      v-if="user && user.legal"
      class="text-success "
    >
    {{user.legal}}
    <!-- {{user.user.firstName}} provided legal documents -->
    </div>
    <div
      v-if="user && user.user.UserRole && user.user.UserRole.role.role =='tutor' && !user.legal"
      class="text-danger bold"
    >No legal document provided yet</div>
  </div>
</template>

<script>
export default {
  name: "ProfileBio",
  props: ["user"]
};
</script>

<style>
.grab-bio .bio {
  font-weight: 100;
  color: #656565;
}
</style>