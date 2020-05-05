import AxiosHelper from "@/helpers/AxiosHelper";

export default {
  // initial state
  state: {
    fetch_my_blog: {
      articles: {},
      errors: {},
      message: "",
      loading: false,
      count: null
    },
    fetch_post: {
      article: {},
      errors: {},
      message: "",
      loading: false
    },
    created_post: {
      article: {},
      errors: {},
      message: "",
      loading: false,
      success: false
    },
    updated_post: {
      article: {},
      errors: {},
      message: "",
      loading: false,
      success: false
    }
  },
  // getters
  getters: {
    fetch_my_blog(state) {
      return state.fetch_my_blog;
    },
    fetch_post(state) {
      return state.fetch_post;
    },
    created_post(state) {
      return state.created_post;
    },
    updated_post(state) {
      return state.updated_post;
    }
  },

  // mutations
  mutations: {
    FETCH_MYBLOG_SUCCESS(state, payload) {
      state.fetch_my_blog.loading = false;
      state.fetch_my_blog.count = payload.articlesCount;
      state.fetch_my_blog.articles = payload.articles;
    },
    FETCH_MYBLOG_FAILURE(state, payload) {
      state.fetch_my_blog.errors = payload;
    },
    RESET_ONE_POST(state) {
      state.fetch_post = {
        article: {},
        errors: {},
        message: "",
        loading: false
      };
    },
    FETCH_ONE_POST_SUCCESS(state, payload) {
      state.fetch_post.loading = false;
      state.fetch_post.article = payload.article;
    },
    FETCH_ONE_POST_FAILURE(state, payload) {
      state.fetch_post.errors = payload;
    },
    CREATE_BLOG_SUCCESS(state, payload) {
      (state.created_post.article = payload.article),
        (state.created_post.success = true);
    },
    CREATE_BLOG_FAILURE(state, payload) {
      state.created_post.errors = payload.errors;
    },
    CREATE_BLOG_RESET(state) {
      state.created_post.errors = {};
      state.created_post.article = {};
      state.created_post.message = "";
      state.created_post.loading = false;
      state.created_post.success = false;
    },
    CREATE_BLOG_LOADING(state) {
      state.created_post.errors = {};
      state.created_post.article = {};
      state.created_post.message = "";
      state.created_post.loading = true;
      state.created_post.success = false;
      state.created_post = {
        article: {},
        errors: {},
        message: "",
        loading: true,
        success: false
      };
    },
    UPDATE_BLOG_SUCCESS(state, payload) {
      state.updated_post.article = payload.article;
      state.updated_post.loading = false;
      state.updated_post.success = true;
    },
    UPDATE_BLOG_FAILURE(state, payload) {
      state.updated_post.errors = payload.errors;
    },
    UPDATE_BLOG_LOADING(state) {
      state.updated_post.errors = {};
      state.updated_post.message = "";
      state.updated_post.loading = true;
      state.updated_post.success = false;
    },
    UPDATE_BLOG_RESET(state) {
      state.updated_post.errors = {};
      state.updated_post.article = {};
      state.updated_post.message = "";
      state.updated_post.loading = false;
      state.updated_post.success = false;
    }
  },
  // actions
  actions: {
    // fetch blog posts
    FETCH_MY_BLOG: context => {
      AxiosHelper.get(`/articles/my-blog`)
        .then(response => {
          context.commit("FETCH_MYBLOG_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_MYBLOG_FAILURE", error);
        });
    },
    // fetch one post
    FETCH_ONE_POST: (context, payload) => {
      context.commit("RESET_ONE_POST");
      context.commit("UPDATE_BLOG_RESET");
      AxiosHelper.get(`/articles/${payload}`)
        .then(response => {
          context.commit("FETCH_ONE_POST_SUCCESS", response.data);
        })
        .catch(error => {
          context.commit("FETCH_ONE_POST_FAILURE", error);
        });
    },

    // create post
    CREATE_POST: (context, payload) => {
      context.commit("CREATE_BLOG_RESET");
      context.commit("CREATE_BLOG_LOADING");
      AxiosHelper.postFormData("/articles", payload)
        .then(response => context.commit("CREATE_BLOG_SUCCESS", response.data))
        .catch(error =>
          context.commit("CREATE_BLOG_FAILURE", error.response.data)
        );
    },

    // create post
    UPDATE_POST: (context, payload) => {
      context.commit("UPDATE_BLOG_LOADING");
      AxiosHelper.patch(`/articles/${payload.slug}`, payload.post)
        .then(response => context.commit("UPDATE_BLOG_SUCCESS", response.data))
        .catch(error =>
          context.commit("UPDATE_BLOG_FAILURE", error.response.data)
        );
    }
  }
};
