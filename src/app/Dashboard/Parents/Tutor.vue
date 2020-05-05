<template>
  <div class="row" slot-scope="tutor">
    <div class="col-sm-1 col-md-1 l-lg-1 image p-0">
      <img
        v-lazy="tutor.image || avatar"
        class="rounded-circle my-2"
        :alt="tutor.firstName"
      />
    </div>
    <div class="col-sm-11 col-md-11 l-lg-11">
      <div>Tutor</div>
      <h4 class="my-1">{{tutor.firstName}} {{tutor.lastName}}</h4>
    </div>
    <div class="clear"></div>
    <div :inner-html.prop="tutor.bio | truncate(250)"></div>
    <div class="my-3">
      <router-link
        :to="`/dashboard/${accountType}/messages`"
        class="btn btn-success rounded"
      >
        <icon class="icon" icon="envelope" />&nbsp;
        Message
      </router-link>
      <router-link :to="`/@${tutor.username}`" class="btn btn-secondary rounded">
        <icon class="icon" icon="user" />&nbsp;
        View tutor
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "TutorComponent",
  props: ["tutor"]
};
</script>