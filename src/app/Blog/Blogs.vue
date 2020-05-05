<template>
  <div>
    <component :is="layout">
      <div class="container">
        <div class="row" v-if="posts && !posts.loading && posts.posts.length">
          <div class="col-sm-12 col-md-9 col-lg-9">
            <div class="row">
              <div
                class="shadow-2 bg-white radius-2 p-4 my-2 col-sm-12"
                v-for="post in posts.posts"
                :key="post.index"
              >
              
                <div class="image">
                  <img
                    v-if="post.coverUrl"
                    v-lazy="`${CDN_IMAGE}/c_thumb,h_200,w_500/${post.coverUrl}` || avatar"
                    class="card-img-top mb-2"
                    :alt="post.title"
                  />
                  <h2>
                    <router-link
                      :to="`/post/${post.category}/${post.slug}`"
                      class="text-dark"
                    >{{ post.title }}</router-link>
                  </h2>
                  <div class="row">
                    <router-link
                      :to="`/post/${post.category}/${post.slug}`"
                      class="btn px-4 rounded border border-dark"
                    >Read More &rarr;</router-link>
                  </div>
                  <div class="p-2 my-2 text-muted">
                    Posted on {{post.createdAt | date }} by
                    <router-link
                      :to="`/@${post.author.username}`"
                    >{{post.author.firstName}} {{post.author.lastName}}</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="loading && posts && posts.loading">
              <div class="no-content">Loading...</div>
            </div>
          </div>
          <div class="col-sm-12 col-md-3 col-lg-3 p-0">
            <img
              src="@/assets/images/coding-class-1.jpg"
              class="img-fluid shadow-2 rounded my-2"
              alt="Coding Class Ads"
              style="max-width:300px;margin:0 auto;display:block"
            />
          </div>
        </div>
        <Loading v-if="posts && posts.loading && !posts.posts.length" />
        <div  v-if="posts && posts.loading && !posts.posts.length" class="blog-loading"></div>
        <div class="row" v-if="posts && !posts.loading && !posts.success && !posts.posts.length">
          <NotFound
            message="No articles found"
            description="Something wrong occured while retrieving informations"
            icon="blog"
          />
        </div>
      </div>
    </component>
  </div>
</template>
<script>
import NotFound from "@/app/NotFound/ContentNotFound";
import Loading from "@/components/commons/Loading";
import { mapActions, mapGetters } from "vuex";
const default_layout = "default";

export default {
  name: "posts",
  components: {
    NotFound,
    Loading
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.$store.dispatch("GET_BLOG_POSTS");
    this.loading = true;
  },
  computed: {
    posts() {
      return this.$store.getters.get_posts;
    },
    ...mapGetters(["get_posts"]),
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  methods: {
    ...mapActions(["changeLikes"]),
    timestamp(time) {
      const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];
      const d = (time || "").split("-");
      const created = `${months[d[1] - 1]} ${(d[2] || "").split("T")[0]}`;
      return created;
    }
  }
};
</script>

<style scoped>
.blog-loading {
  height: 300px;
}
.row {
  width: 100%;
  margin: 0;
}
.card {
  margin-bottom: 20px !important;
  border-radius: 0 !important;
  border: 5px solid #c3c3c3;
  margin: auto 1%;
  width: 98% !important;
  position: relative;
}
.card::before {
  position: absolute;
  bottom: -8px;
  height: 4px;
  background: #c7c7c7;
  width: 96%;
  content: "";
  left: 2%;
}
.card::after {
  position: absolute;
  bottom: -12px;
  height: 4px;
  background: #dbdbdb;
  width: 92%;
  content: "";
  left: 3%;
}

.image-post {
  margin: 0;
  padding: 0;
  max-width: 100%;
}

.image-post img {
  margin: 0 auto;
  max-width: 100%;
}
</style>
