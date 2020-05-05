<template>
  <div>
    <component :is="layout">
      <Welcome />
      <Drivers />
      <Codingclass />
      <About />
    </component>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Welcome from "./Welcome";
import About from "./About";
import Codingclass from "./Codingclass";
import Drivers from "./Drivers";
const default_layout = "default";
export default {
  metaInfo: {
    title: "Find Best Instructors, Tutors & Mentors Near You",
    titleTemplate: "%s - | Keetela.com | Igniting minds for success!",
    meta: [
      {
        name: "description",
        content:
          "Acquisition of knowledge and skills necessary to achieve career advancement and personal growth"
      },
      {
        name: "keywords",
        content: "Tutors, Mentorship, Training, Coding Class, Programming Training"
      }
    ]
  },
  name: "home",
  components: {
    Welcome,
    About,
    Codingclass,
    Drivers
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>
