import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import posts from './modules/posts';
import users from './modules/users';
import education from './modules/education';
import tutoring from './modules/tutoring';
import tutorship from './modules/tutorship';
import legal from './modules/legal';
import blog from './modules/blog';
import services from './modules/services';
import cart from './modules/cart';
import payment from './modules/payment';
import subscriptions from './modules/subscriptions';
import courses from './modules/courses';
import tutors from './modules/tutors';

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    posts,
    users,
    education,
    tutoring,
    tutorship,
    legal,
    blog,
    services,
    cart,
    payment,
    subscriptions,
    courses,
    tutors
  }
});
