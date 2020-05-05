<template>
  <div id="tutors">
    <component :is="layout">
      <div class="grab-apply-cover d-flex align-items-center">
        <div class="py-4 px-2 text-center text-white">
          <h1>Keetela Coding Class</h1>
          <div>
            <div>Tel: +250-783-699-653</div>
            <div>Email: codingclass@keetela.com</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div style="max-width:800px;display:block;margin:0 auto" class="p-4 shadow-lg">
          <h2 class="mt-4 text-center">[We are accepting applications]</h2>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScR-C9hpvLcuz13nlujt4c5Cke47JTyq4dCEl-C9OYVK0-JxQ/viewform?embedded=true"
            height="1267"
            style="width:100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >Loading…</iframe>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
export default {
  metaInfo: {
    title: "Coding Class for young generation",
    titleTemplate: "%s - | Keetela.com | Igniting minds for success!",
    meta: [
      {
        name: "description",
        content:
          "Keetla Coding class is programming training tailored for young generation: young kids, secondary graduates and university graduates"
      },
      {
        name: "keywords",
        content: "Programming, Training, Coding Class, World Class software developers"
      }
    ]
  },
  name: "codingclass",
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    this.loaded = true;
  },
  computed: {
    auth() {
      return JSON.parse(localStorage.getItem("user"));
    },
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>
<style scoped>
.grab-apply-cover {
  height: 50vh;
  background: url("../../../assets/images/coaching-kig.jpg");
  background-attachment: scroll;
  background-position: center top;
  background-size: cover;
  position: relative;
}
.grab-apply-cover::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: 1;
}
.grab-apply-cover h1 {
  width: 100%;
  position: relative;
  z-index: 10;
}
.grab-apply-cover div {
  width: 100%;
  position: relative;
  z-index: 10;
}
.align-items-center {
  -ms-flex-align: center !important;
  align-items: center !important;
}
.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}
</style>
