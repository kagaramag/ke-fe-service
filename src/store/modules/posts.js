import AxiosHelper from "@/helpers/AxiosHelper";
export default {
  // initial state
  state: {
    get_posts: {
      posts: [],
      errors: {},
      loading: false,
      success: false
    }
  },
  // getters
  getters: {
    get_posts(state) {
      return state.get_posts;
    },
    errors(state) {
      return state.errors;
    }
  },

  // mutations
  mutations: {
    INIT_BLOG(state) {
      state.get_posts.posts = [];
      state.get_posts.errors = {};
      state.get_posts.loading = true;
      state.get_posts.success = false;
    },
    GET_BLOG_SUCCESS(state, payload) {
      state.get_posts.success = true;
      state.get_posts.loading = false;
      state.get_posts.posts = payload;
    },
    GET_BLOG_FAILURE(state, payload) {
      state.get_posts.loading = false;
      state.get_posts.success = false;
      state.get_posts.errors = payload.errors;
    }
  },

  // actions
  actions: {
    GET_BLOG_POSTS: context => {
      context.commit("INIT_BLOG");
      AxiosHelper.get("/articles?limit=20")
        .then(response =>
          context.commit("GET_BLOG_SUCCESS", response.data.articles)
        )
        .catch(error =>
          context.commit("GET_BLOG_FAILURE", error.response.data)
        );
    }
  }
};
