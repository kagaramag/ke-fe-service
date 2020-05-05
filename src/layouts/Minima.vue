<!-- 
####### MINIMA LAYOUT #######
"Layout for pages without header/sidebar" 
##############################
-->

<script>
export default {
  name: "layout-mimina"
};
</script>
<template>
  <div>
    <div class="container layout">
      <div class="background">
        <!-- <img src="@/assets/images/learn-to-ride.jpg" /> -->
      </div>
      <div class="row">
        <div class="col">
          <div class="wrap-box bg-white shadow-lg pb-1">
            <div class="bg-primary">
              <div class="image minima-logo py-3">
                <router-link :to="'/'">
                  <img src="@/assets/images/logo_XII.svg" />
                </router-link>
              </div>
            </div>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.minima-logo {
  max-width: 200px;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: black;
  background-image: url('./../assets/images/learn-to-ride.jpg');
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat
}

.background::before {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.layout {
  margin-top: 0px;
  max-width: 900px !important;
}

.wrap-box {
  max-width: 500px;
  margin: 70px auto 30px auto;
  border-radius: 0 0 5px 5px!important;
}
</style>
