<template>
  <div class="p-3 mt-4" slot-scope="education" v-if="education && education.length">
    <h4 class="my-3 px-0">Education</h4>
      <div
        v-for="item in education"
        :key="item.index"
        class="shadow bg-white radius-3 rounded mb-4 mt-2 row"
      >
        <div class="col-2">
          <div class="image image-identity">
            <img src="@/assets/images/diploma.svg" alt />
          </div>
        </div>
        <div class="col-10">
          <div class="mt-1">{{item.college}}</div>
          <h4 class="my-1">{{item.institution}}</h4>
          <div>{{item.certificate}} in {{item.course}}</div>
          <div class="mt-1">{{item.graduated ? '' : 'On going'}}</div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "ProfileBio",
  props: ["education"]
};
</script>

<style>
.grab-bio .bio {
  font-weight: 100;
  color: #656565;
}

.image-identity img {
  max-width: 80px !important;
  margin: 15px auto;
  display: block;
}
</style>