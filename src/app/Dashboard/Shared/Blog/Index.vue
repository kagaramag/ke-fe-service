<template>
  <div id="settings">
    <component :is="layout">
      <div class="profile">
        <div class="box">
          <h2>
            My articles
            <router-link
              class="btn float-right rounded px-4 bg-success text-light"
              :to="`/dashboard/${accountType}/my-blog/compose`"
            >Write article</router-link>
          </h2>

          <div class="divider my-4"></div>
          <!-- My blog posts -->
          <div class="row">
            <div class="col">
              <div
                class="card shadow radius-1 p-3 mb-2"
                v-for="article in articles.articles"
                :key="article.index"
              >
                <div class="row">
                  <div class="col-sm-12 col-md-4 col-lg-3">
                    <img
                      v-lazy="article.coverUrl ? `${CDN_IMAGE}/c_thumb,h_250,w_500/${article.coverUrl}` : image"
                      class="card-img-top rounded mb-4"
                      :alt="article.title"
                    />
                  </div>
                  <div class="col-sm-12 col-md-8 col-lg-9">
                    <div>{{ article.category | capitalize}}</div>
                    <h3>{{article.title}}</h3>
                    <div class="article-actions py-2">
                      <router-link
                        class="mx-0 border border-success text-success radius-1 mr-2"
                        :to="`/dashboard/${accountType}/my-blog/${article.slug}/edit`"
                      >
                        <icon class="icon" icon="edit" />&nbsp;Edit
                      </router-link>
                      <router-link
                        class="border border-gray text-gray radius-1"
                        :to="`/post/${article.category}/${article.slug}`"
                      >
                        <icon class="icon" icon="globe" />&nbsp;View public
                      </router-link>
                    </div>
                    <div class="article-details my-2">
                      <span>
                        Created
                        <b>{{ article.createdAt | date }}</b> &nbsp;
                        Last updated
                        <b>{{ article.updatedAt | date }}</b>
                      </span>
                    </div>
                  </div>
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
import { mapGetters, mapActions } from "vuex";

const account_layout = "account";

export default {
  name: "AdminBlog",
  data() {
    return {
      accountType: "p"
    };
  },
  mounted() {
    this.$store.dispatch("FETCH_MY_BLOG");
  },
  computed: {
    articles() {
      return this.$store.getters.fetch_my_blog;
    },
    ...mapGetters(["fetch_my_blog"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  }
};
</script>

<style scoped>
.profile {
  width: 100%;
  margin: 0;
}

.profile .bio {
  font-weight: 100;
}

.article-actions a,
.article-actions button {
  padding: 7px 15px;
  margin-right: 10px;
  font-weight: 300;
}
</style>
