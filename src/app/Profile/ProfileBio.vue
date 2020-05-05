<template>
  <div id="profile-bio" class="grab-bio mt-2" slot-scope="user">
    <h3 style="font-weight:normal;">Hi, I am {{user.firstName}}</h3>
    <div class="bio mt-2" v-html="user.bio"></div>
  </div>
</template>

<script>
export default {
  name: "ProfileBio",
  props: ["user"]
}
</script>

<style>
.grab-bio .bio {
  font-weight: 100;
  color: #656565
}
.grab-bio .bio p{
  margin:2px 0!important;
}
.grab-bio .bio p span{
  background: transparent!important
}
.grab-bio .bio p br{
  margin:0px 0!important;
  height:1px!important
}
</style>