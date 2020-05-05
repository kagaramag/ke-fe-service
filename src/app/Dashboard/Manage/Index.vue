<template>
  <div>
    <component :is="layout">
      <div class="mx-4 px-2">
        <div class="row">
          <div class="col-sm-12 col-md-3 col-lg-3">
            <Nav />
          </div>
          <div class="col-sm-12 col-md-9 col-lg-9">
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <h5 class="card-title">Course in Primary Schools</h5>
                <h6 class="card-subtitle mb-2 text-muted">We cover almost all subjects</h6>
                <div
                  class="card-text py-3"
                  v-if="get_courses && get_courses.courses && get_courses.loaded"
                >
                  <div
                    class="bg-white one-course border rounded"
                    v-for="(course, index) in get_courses.courses"
                    :key="index"
                  >
                    <img :src="course.icon" alt="course" />
                    <span>{{ course.course }}</span>
                  </div>
                </div>
                <br />
                <div class="mt-3">
                  <!-- <button href="#" class="btn btn-primary rounded">Add a course</!-->
                </div>
              </div>
            </div>
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body">
                <h5 class="card-title">Mentorship Topics</h5>
                <h6
                  class="card-subtitle mb-2 text-muted"
                >We have hundrends topics you can choose! And still counting...</h6>
                <div class="card-text py-3">
                  <div
                    class="bg-white one-course border rounded"
                    v-for="(topic, index) in get_mentor_topics"
                    :key="index"
                  >
                    <img :src="topic.icon ? topic.icon : topicIcon" alt="topic" />
                    <span>{{ topic.course }}</span>
                  </div>
                </div>
                <br />
                <div class="mt-3">
                  <!-- <button href="#" class="btn btn-primary rounded">Add a topic</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>
<script>
import Vue from "vue";
import NotFound from "@/app/NotFound/ContentNotFound";
import { mapGetters, mapActions } from "vuex";
import Nav from "./Nav";
const account_layout = "account";
export default {
  name: "DashboardSubscriptionsIndex",
  components: {
    Nav,
    NotFound
  },
  data() {
    return {
      loaded: false,
      topicIcon: "https://image.flaticon.com/icons/svg/432/432541.svg"
    };
  },
  created() {
    this.loaded = true;
  },
  mounted() {
    this.fetchCourses();
    this.fetchTopics();
  },
  computed: {
    get_courses() {
      return this.$store.getters.get_courses;
    },
    get_mentor_topics() {
      return this.$store.getters.get_mentor_topics;
    },
    ...mapGetters(["get_courses", "get_mentor_topics"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    ...mapActions(["fetchCourses", "fetchTopics"])
  }
};
</script>

<style scoped>
.one-course {
  position: relative;
  width: 32%;
  float: left;
  border-radius: 5px;
  margin: 0 1% 10px 0;
  padding: 15px 0 !important;
}
.one-course span {
  position: relative;
  left: 55px;
  margin: 10px 0;
}
.one-course img {
  position: absolute;
  width: 30px;
  height: auto;
  top: 10px;
  left: 15px;
}
</style>
