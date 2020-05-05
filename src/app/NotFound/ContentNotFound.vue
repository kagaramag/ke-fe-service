<template>
  <div class="card border border-warning shadow mb-3 p-4 radius-1">
    <div class="row no-gutters">
       <div class="col-2">
      <img src="./../../assets/images/alert.svg" class="card-img" alt="not found">
    </div>
      <div class="col-10">
        <div class="card-body">
          <h2 class="font-weight-light text-gray">{{message || 'Content not found'}}</h2>
          <h5 class="card-title font-weight-light">
            {{ description || 'The content you are looking for does not exit or it is currently unavailable' }}
          </h5>
          <div class="py-3"
          v-if="link && linkText"
          >
            <router-link class="btn btn-black rounded px-4" :to="link">{{linkText}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const minima_layout = "minima";
export default {
  name: "notfound",
  props: ["message", "description", "button", "link", "linkText"],
  computed: {
    layout() {
      return (this.$route.meta.layout || minima_layout) + "-layout";
    }
  }
};
</script>

<style scoped>
.card.border{
  border-width: 4px!important
}
</style>