<template>
  <div id="tutors">
    <component :is="layout">
      <div class="container">
        <!-- search tutors -->
        <!-- List of Tutors -->
        <div class="grabtutors mb-5" v-if="tutors && tutors.tutors && tutors.tutors.length > 0">
          <h2 class="mt-4 text-center">Tutors</h2>
          <div class="text-center">Find the perfect tutor around you</div>
          <div class="row">
            <div
              class="col-sm-12 col-md-6 col-lg-4"
              v-for="tutor in tutors.tutors"
              :key="tutor.index"
            >
              <router-link :to="`/@${tutor.user.username}`">
                <div class="card shadow-lg radius-3">
                  <div class="row pt-3">
                    <div class="col-12">
                      <img
                        v-lazy="tutor.user.image || avatar"
                        class="card-img-top shadow rounded-circle mb-4"
                        :alt="tutor.user.lastName"
                      />
                    </div>
                    <div class="col-12 text-center">
                      <h3
                        class="text-truncate mb-0 nobold text-dark text-center"
                      >{{tutor.user.lastName | capitalize}} {{tutor.user.firstName}}</h3>
                      <div class="card-text mx-3 my-1" style="color:#646464;height:70px">
                        <div :inner-html.prop="tutor.user.bio | truncate(130)"></div>
                      </div>
                    </div>
                    <div class="col-12 text-center py-3">
                      <router-link
                        class="btn btn-success shadow rounded"
                        :to="`/@${tutor.user.username}`"
                      >View Profile</router-link>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="row pagination">
            <div class="col text-center my-5">
              <button
                v-on:click="goToPrev()"
                :disabled="pagination.page < 2"
                type="button"
                class="btn bg-white border border-dark rounded-pill mx-3 px-5"
              >Prev</button>
              <button
                v-on:click="goToNext()"
                :disabled="
                tutors && tutors.tutors && 
                  tutors.tutors.length < 3
              "
                type="button"
                class="btn bg-white border border-dark rounded-pill mx-3 px-5"
              >Next</button>
            </div>
          </div>
        </div>
        <div
          class="grabtutors mb-5"
          v-if="loaded && tutors && tutors.tutors && !tutors.loading  && !tutors.success && !tutors.tutors.length && tutors.count === 0"
        >
          <NotFound
            message="Tutors not found"
            description="Something wrong occured while retrieving informations"
            icon="user"
          />
        </div>
        <div
          class="grabtutors mb-5"
          v-if="tutors && tutors.loading"
        >
          <Loading />
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NotFound from "@/app/NotFound/ContentNotFound";
import Loading from "@/components/commons/Loading";

const default_layout = "default";
export default {
  name: "tutors",
  components: {
    NotFound,
    Loading
  },
  data() {
    return {
      loaded: false,
      pagination: {
        limit: 9,
        offset: 0,
        page: 1
      }
    };
  },
  mounted() {
    this.$store.dispatch("FETCH_TUTORS", this.pagination);
    this.loaded = true;
  },
  computed: {
    tutors() {
      return this.$store.getters.fetch_tutors;
    },
    ...mapGetters(["fetch_tutors"]),
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  methods: {
    goToPrev() {
      this.pagination = {
        limit: 9,
        offset:
          this.pagination.page > 1
            ? this.pagination.offset - this.pagination.limit
            : 0,
        page: this.pagination.page > 1 ? this.pagination.page - 1 : 1
      };
      this.$store.dispatch("FETCH_TUTORS", this.pagination);
    },
    goToNext() {
      this.pagination = {
        limit: 9,
        offset:
          this.pagination.page > 1
            ? this.pagination.limit * this.pagination.page
            : this.pagination.limit,
        page: this.pagination.page + 1
      };
      this.$store.dispatch("FETCH_TUTORS", this.pagination);
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

.post-link {
  border-radius: 0 !important;
  border: 5px solid #09835a;
  margin: auto 0%;
  padding: 0%;
  width: 100%;
  position: relative;
}
.post-link a {
  display: block;
}
.card {
  border: none;
  margin-top: 20px;
}
.card h3 {
  font-weight: 500;
}
.card .bg-light {
  background: #e0e0e0 !important;
}
.card-img-top {
  width: 80%;
  max-width: 120px;
  margin: 2% auto;
  display: block;
}
.summary-info b {
  font-size: 15px;
  font-size: 200;
}
.summary-info span {
  font-size: 28px;
  font-size: 700;
}
.icon {
  color: #dfdfdf;
  font-size: 18px;
  position: relative;
  top: -2px;
}
.verified .icon {
  color: #4e836a;
}
.pagination .btn:disabled {
  opacity: 0.2;
  cursor: unset !important;
}
</style>
