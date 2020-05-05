<!-- 
####### DEFAULT LAYOUT #######
"Layout for public pages, it only contains header" 
##############################
-->
<template>
<div>
  <Header />
    <slot />
  <Footer />
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer";
export default {
  components: {
    Header,
    Footer
  },
};
</script>
