import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/components/auth/Login")
    },
    {
      path: "/tutors",
      name: "tutors",
      component: () => import("@/app/Tutors/Index")
    },
    {
      path: "/contact",
      name: "contact-us",
      component: () => import("@/app/Contact")
    },
    {
      path: "/codingclass",
      name: "apply-for-tutor",
      component: () => import("@/app/Services/Codingclass")
    },
    {
      path: "/tutoring",
      name: "service-tutoring",
      component: () => import("@/app/Services/Tutoring")
    },
    {
      path: "/mentoring",
      name: "service-mentoring",
      component: () => import("@/app/Services/Mentoring")
    },
    {
      path: "/training",
      name: "service-training",
      component: () => import("@/app/Services/Training")
    },
    {
      path: "/tutoring-courses",
      name: "help-mentoring",
      component: () => import("@/app/Help/Courses")
    },
    {
      path: "/register",
      component: () => import("@/components/auth/Type")
    },
    {
      path: "/register/:type",
      component: () => import("@/components/auth/Register")
    },
    {
      path: "/account-type/:username",
      component: () => import("@/components/auth/Type")
    },
    {
      path: "/reset",
      component: () => import("@/components/auth/Reset")
    },
    {
      path: "/reset/:token",
      component: () => import("@/components/auth/Reset")
    },
    {
      path: "/confirm/:token",
      component: () => import("@/components/auth/Confirm")
    },
    {
      path: "/activate/:token",
      component: () => import("@/components/auth/Activate")
    },
    {
      path: "/@:username",
      name: "profile",
      component: () => import("@/app/Profile/Index")
    },
    {
      path: "/dashboard/:type",
      name: "profile",
      component: () => import("@/app/Dashboard/Home/Index"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/settings",
      name: "Profile Settings",
      component: () => import("@/app/Dashboard/Shared/Settings/Index"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/manage",
      name: "Manage",
      component: () => import("@/app/Dashboard/Manage/Index"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/manage/tutors",
      name: "Tutors",
      component: () => import("@/app/Dashboard/Manage/Tutors"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/mentors",
      name: "Mentors",
      component: () => import("@/app/Dashboard/Manage/Mentors"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/subscriptions",
      name: "Profile Settings",
      component: () => import("@/app/Dashboard/Subscriptions"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/coaching",
      name: "coaching",
      component: () => import("@/app/Dashboard/Tutoring/Index"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/kids",
      name: "kids",
      component: () => import("@/app/Dashboard/Parents"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/coaching/:id",
      name: "coaching",
      component: () => import("@/app/Dashboard/Tutorship/Index"),
      meta: {
        auth: true
      }
    },
    {
      path: "/post/:category/:slug",
      name: "post",
      component: () => import("@/app/Blog/Post")
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/app/Blog/Blogs")
    },
    {
      path: "/dashboard/:type/my-blog/compose",
      name: "blog-post",
      component: () => import("@/app/Dashboard/Shared/Blog/Create"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/my-blog",
      name: "blog",
      component: () => import("@/app/Dashboard/Shared/Blog/Index")
    },
    {
      path: "/dashboard/:type/my-blog/:slug/edit",
      name: "blog-post",
      component: () => import("@/app/Dashboard/Shared/Blog/Edit"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/tutor-application",
      name: "profile",
      component: () => import("@/app/Dashboard/Tutors/Profile"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/services",
      name: "profile",
      component: () => import("@/app/Dashboard/Services"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/services/create",
      name: "profile",
      component: () => import("@/app/Dashboard/Services/Create"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/admin",
      name: "profile",
      component: () => import("@/app/Dashboard/Admin"),
      meta: {
        auth: true
      }
    },
    {
      path: "/dashboard/:type/hiring/:username",
      name: "profile",
      component: () => import("@/app/Dashboard/Hiring"),
      meta: {
        auth: true
      }
    },
    {
      path: "*",
      component: () => import("@/app/NotFound/PageNotFound")
    }
  ],
  linkExactActiveClass: "is-active",
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem("isAuth") === "true") {
      next();
      return;
    } else {
      next({
        path: '/login',
        query: {
          url: to.path
        }
      });
    }
  } else {
    next();
  }
});

export default router;
