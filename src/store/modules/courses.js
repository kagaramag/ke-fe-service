import FirebaseHelper from "@/helpers/FirebaseHelper";

export default {
  state: {
    get_courses: {
      courses: [],
      loaded: false,
      success: false,
      errors: {},
      message: ''
    },
    request_tutor: {
      loaded: false,
      success: false,
      errors: {},
      message: ''
    },
    become_tutor: {
      loaded: false,
      success: false,
      errors: {},
      message: ''
    },
    get_mentor_topics: {
      topics: [],
      courses: [],
      loaded: false,
      errors: {},
      message: ''
    }
  },
  getters: {
    get_courses(state) {
      return state.get_courses;
    },
    get_mentor_topics(state) {
      return state.get_mentor_topics;
    },
    request_tutor(state) {
      return state.request_tutor;
    },
    become_tutor(state) {
      return state.become_tutor;
    }
  },

  mutations: {
    RESET_BECOME_TUTOR(state, payload) {
      state.become_tutor.loaded = false;
      state.become_tutor.success = false;
      state.become_tutor.mesesage = "";
    },
    CREATE_BECOME_TUTORS_SUCCESS(state, payload) {
      state.become_tutor.loaded = false;
      state.become_tutor.success = true;
      state.become_tutor.mesesage = "We have received your request successfully! We will contact you as soon as possible!";
    },
    RESET_TUTOR_REQUEST(state, payload) {
      state.request_tutor.loaded = false;
      state.request_tutor.success = false;
      state.request_tutor.mesesage = "";
    },
    CREATE_TUTOR_REQUEST_SUCCESS(state, payload) {
      state.request_tutor.loaded = false;
      state.request_tutor.success = true;
      state.request_tutor.mesesage = "We have received your request successfully! We will contact you as soon as possible!";
    },
    FETCH_COURSES_SUCCESS(state, payload) {
      state.get_courses.courses = payload;
      state.get_courses.loaded = true;
    },
    FETCH_COURSES_FAILURE(state, payload) {
      console.log('FAIL', payload)
    },
    CREATE_COURSE_SUCCESS(state, payload) {
      console.log('SUCCESS', payload)
    },
    CREATE_COURSE_FAILURE(state, payload) {
      console.log('FAIL', payload)
    },
    FETCH_TOPICS_SUCCESS(state, payload) {
      state.get_mentor_topics = payload;
    },
    FETCH_TOPICS_FAILURE(state, payload) {
      console.log('FAIL', payload)
    },
    CREATE_TOPIC_SUCCESS(state, payload) {
      console.log('SUCCESS', payload)
    },
    CREATE_TOPIC_FAILURE(state, payload) {
      console.log('FAIL', payload)
    },
  },
  actions: {
    createCourses: (context, payload) => {
      FirebaseHelper.save(`/primaryCourses`, payload)
      .then(response => {
        context.commit("CREATE_COURSE_SUCCESS", response);
      })
      .catch(error => {
        context.commit("CREATE_COURSE_FAILURE", error);
      });
    },
    fetchCourses: (context) => {
      FirebaseHelper.get(`/primaryCourses`)
      .then(response => {
        context.commit("FETCH_COURSES_SUCCESS", response);
      })
      .catch(error => {
        context.commit("FETCH_COURSES_FAILURE", error);
      });
    },
    createTopics: (context, payload) => {
      FirebaseHelper.save(`/mentorTopics`, payload)
      .then(response => {
        context.commit("CREATE_TOPIC_SUCCESS", response);
      })
      .catch(error => {
        context.commit("CREATE_TOPIC_FAILURE", error);
      });
    },
    fetchTopics: (context) => {
      FirebaseHelper.get(`/mentorTopics`)
      .then(response => {
        context.commit("FETCH_TOPICS_SUCCESS", response);
      })
      .catch(error => {
        context.commit("FETCH_TOPICS_FAILURE", error);
      });
    },
    createTutorRequest: (context, payload) => {
      context.commit('RESET_TUTOR_REQUEST');
      FirebaseHelper.save(`/tutorRequests`, payload)
      .then(response => {
        context.commit("CREATE_TUTOR_REQUEST_SUCCESS", response);
      })
      .catch(error => {
        context.commit("CREATE_TUTOR_REQUEST_FAILURE", error);
      });
    },
    createBecomeTutor: (context, payload) => {
      context.commit('RESET_BECOME_TUTOR');
      FirebaseHelper.save(`/tutors`, payload)
      .then(response => {
        context.commit("CREATE_BECOME_TUTORS_SUCCESS", response);
      })
      .catch(error => {
        context.commit("CREATE_BECOME_TUTORS_FAILURE", error);
      });
    },
  }
};
