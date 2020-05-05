<template>
  <div class="animated loader"></div>
</template>
<style scoped>
.loader {
  -webkit-animation-name: horizontalProgressBar;
  animation-name: horizontalProgressBar;
  -webkit-animation-timing-function: ease;
  animation-timing-function: ease;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background: #ef534e;
  height: 5px;
  left: 0;
  top: 0;
  width: 100%;
  height: 3px;
  z-index: 9999999;
  position: fixed;
}
.animated {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.loader:after {
  display: block;
  position: absolute;
  content: "";
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: #ef534e 1px 0 6px 1px;
  opacity: 0.5;
}
@keyframes horizontalProgressBar {
  0% {
    width: 0%;
  }
  20% {
    width: 10%;
  }
  30% {
    width: 15%;
  }
  40% {
    width: 18%;
  }
  50% {
    width: 20%;
  }
  60% {
    width: 22%;
  }
  100% {
    width: 100%;
  }
}
</style>