<template>
  <div>
    <component :is="layout">
      <div
        v-if="
      loaded
      && getPayment 
      && getPayment.loading 
      && !getPayment.success
      "
        class="process-payment-loading"
      >
        <div class="process-payment">
          <img src="../../../assets/images/shopping-bag.svg" alt="load payment" />
          <h4 class="font-weight-light">Processing payment, please wait...</h4>
        </div>
      </div>
      <div
        v-if="loaded && getPayment && !getPayment.loading && !getPayment.success"
        class="content-steps mt-2 mb-2"
      >
        <h3
          class="text-center mt-2 mb-4 font-weight-light"
        >Hiring: {{fetch_tutor.user.gender === 'male' ? 'Mr' : 'Mr/Mrs'}} {{fetch_tutor.user.firstName}}</h3>
        <div class="row">
          <div class="col-sm-12 col-md-6 l-lg-6">
            <!-- TUTOR PROFILE -->
            <div class="box shadow-2 radius-1 p-3 mb-3 bg-white">
              <div class="row">
                <div class="col-sm-3 col-md-3 l-lg-3 image">
                  <img
                    v-lazy="fetch_tutor.user.image || avatar"
                    class="rounded-circle my-2"
                    :alt="fetch_tutor.user.firstName"
                  />
                </div>
                <div class="col-sm-9 col-md-9 l-lg-9">
                  <h4
                    class="mt-2 font-weight-light"
                  >{{fetch_tutor.user.firstName}} {{fetch_tutor.user.lastName}}</h4>
                  <div class="text-primary">
                    <icon class="icon" icon="map-marker-alt" />
                    <span v-if="fetch_tutor.location">
                      {{fetch_tutor.location.province}},
                      {{fetch_tutor.location.sector}},
                      {{fetch_tutor.location.district}}
                      {{fetch_tutor.location.cell}},
                    </span>
                  </div>
                  <div class="clear"></div>
                  <div class="my-3">
                    <router-link
                      class="btn rounded px-3 border"
                      :to="`/@${fetch_tutor.user.username}`"
                    >
                      View tutor
                      <icon class="icon text-gray" icon="external-link-square-alt" />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <!-- SELECT CHILD -->
            <div
              v-if="fetch_tutor && fetch_tutor.services.length"
              class="box shadow-2 radius-1 p-3 mb-3 bg-white"
            >
              <h4 class="font-weight-light m-2">Child</h4>
              <div class="m-2">
                <!-- <b-form-group id="select-learner" label-for="learner"> -->
                <b-form-select v-model="info.learnerId">
                  <template v-slot:first>
                    <option :value="null" disabled>Select your child</option>
                  </template>
                  <option
                    v-for="(kid, index) in fetch_user.kids"
                    :key="index"
                    :selected="index === 0 ? 'selected' : ''"
                    :value="kid.id"
                  >{{kid.names}}</option>
                </b-form-select>
                <!-- </b-form-group> -->
              </div>
            </div>
            <!-- PREFERENCE -->
            <div
              v-if="fetch_tutor && fetch_tutor.services.length"
              class="box shadow-2 radius-1 p-3 mb-3 bg-white"
            >
              <h4 class="font-weight-light m-2">Preference</h4>
              <div class="row">
                <div class="col-6">
                  <div>
                    Starting date
                    <br />
                    <div class="form-group">
                      <datetime
                        input-style="padding: 5px 8px"
                        type="date"
                        id="startingDate"
                        v-model="info.startingDate"
                        zone="Africa/Kigali"
                        :phrases="{ok: 'Select', cancel: 'Cancel'}"
                        :week-start="7"
                        v-on:input="listenDateChange(info.startingDate)"
                        :min-datetime="minDatetime"
                        :inline="true"
                        auto
                      ></datetime>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  How many month?
                  <br />
                  <b-form-select
                    v-model="month"
                    v-on:input="listenPeriodChange(month)"
                    :options="monthsArray"
                  ></b-form-select>
                </div>
              </div>
            </div>
            <!-- TUTORSHIP SERVICE -->
            <div
              v-if="fetch_tutor && fetch_tutor.services.length"
              class="box shadow-2 radius-1 p-3 mb-3 bg-white"
            >
              <h4 class="font-weight-light m-2">Tutorship service</h4>
              <div
                class="row py-3"
                :class="{'border-success bg-light': selectedService == item.id}"
                v-for="(item, index) in fetch_tutor.services"
                :key="index"
              >
                <div class="col-1">
                  <div
                    v-if="selectedService == item.id"
                    class="image"
                    style="width:20px;margin-top:25px"
                  >
                    <img src="@/assets/images/step_checked.svg" />
                  </div>
                  <div
                    v-if="selectedService != item.id"
                    class="image"
                    style="width:20px;margin-top:25px"
                  >
                    <img src="@/assets/images/step_unchecked.svg" />
                  </div>
                </div>
                <div class="col-7">
                  <h5>{{item.name}}</h5>
                  <div>
                    <button
                      :class="{'btn-success': selectedService == item.id}"
                      class="btn col my-2 border radius-1 px-4"
                      v-on:click.prevent="select(item.id, JSON.parse(item.period).type,  JSON.parse(item.period).count, item.price)"
                    >Select</button>
                  </div>
                  <div>
                    <router-link :to="'/'">Learn more</router-link>
                  </div>
                </div>
                <div class="col-4">
                  <span>Price(Rwf)</span>
                  <div class="bold text-success" style="font-size:35px">{{item.price}}</div>
                  <div>{{item.period.count}} time(s) a {{JSON.parse(item.period).type}}</div>
                </div>
                <div class="divider my-2 bg-gray"></div>
              </div>
            </div>

            <div class="box shadow-2 radius-1 p-3 mb-3 bg-white">
              <h4 class="font-weight-light m-2">Need help?</h4>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Tel: +250-788-867-447</li>
                <li class="list-group-item">Email: support@keetela.com</li>
                <li class="list-group-item">
                  <router-link :to="'/faqs'">Visit FAQs</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 l-lg-6" v-if="fetch_tutor && !fetch_tutor.services.length">
            <div class="box bg-white radius-1 p-3 mb-3 border-warning payment-summary">
              <h4 class="font-weight-light p-2">Sorry, this tutor did not allow to be hired yet.</h4>
                  <div class="my-3">
                    <router-link
                      class="btn btn-black rounded px-4"
                      :to="'/tutors'"
                    >
                      Search tutors
                    </router-link>
                  </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 l-lg-6" v-if="fetch_tutor && fetch_tutor.services.length">
            <div class="box bg-white radius-1 p-3 mb-3 payment-summary">
              <!-- SUMMARY -->
              <h3 class="font-weight-light">Payment</h3>
              <div
                class="py-3"
                v-if="
                info 
                && info.startingDate
                && month
                "
              >
                You are about to pay Mr/Ms {{fetch_tutor.user.firstName}} the fees for tutorship.
                <br />
                A period of {{month}} months starting from {{info.startingDate}}
              </div>
              <div class="clear"></div>
              <!-- PAYMENT -->
              <div class="py-3 bg-gray">
                <h5 class="font-weight-light">Pay with:</h5>
                <div class="wrap-sp">
                  <img src="@/assets/images/mtn-logo.svg" alt="mtn" />
                  <img src="@/assets/images/airtel-logo.svg" alt="airtel" />
                </div>
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
              <!-- ENTER INFO -->
              <div class="py-3">
                <h4 class="font-weight-light">Phone number</h4>
                <b-form-input
                  type="number"
                  v-model="info.phone"
                  placeholder="Enter your phone number"
                ></b-form-input>
                <h4 class="font-weight-light mt-4">Promo code</h4>
                <b-form-input type="number" v-model="info.promo" placeholder="Enter promo code"></b-form-input>
              </div>
              <!-- TOTAL FEES -->
              <div class="py-3">
                <h3 class="font-weight-light">
                  Total:
                  <span class="float-right bold">{{info.total || '0.00'}}</span>
                </h3>
              </div>
              <div class="divider my-3"></div>
              <!-- SUBMIT + ERROR MESSAGES -->
              <div
                class="alert alert-info"
                v-if="getPayment && getPayment.loading && !getPayment.success"
              >Loading...</div>
              <div
                class="alert alert-success"
                v-if="getPayment && !getPayment.loading && getPayment.success && getPayment.message"
              >{{getPayment.message}}</div>
              <div
                class="alert alert-danger"
                v-if="loaded && getPayment && getPayment.errors && getPayment.errors.length"
              >{{getPayment.errors}}</div>
              <div class="py-3">
                <button
                  :disabled="!info.startingDate
                  || !info.learnerId
                  || !info.serviceId
                  || !month
                  "
                  v-on:click.prevent="paynow"
                  class="btn btn-lg radius-1 btn-warning col text-center"
                >Complete Purchase</button>
              </div>
              <div class="divider my-3"></div>
              <!-- TERMS -->
              <div class="py-3">
                By click, you agree to our
                <router-link :to="'/'">Tutorship Policy</router-link>,&nbsp;
                <router-link :to="'/'">Terms of Use</router-link>&nbsp; and
                <router-link :to="'/'">Privacy Policy</router-link>.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loaded && getPayment && !getPayment.loading && getPayment.success" class="box">
        <div class="text-center py-4">
          <img src="../../../assets/images/celebrate.svg" alt="celebrate" style="max-width:120px" />
          <h1 class="font-weight-light">Thank you.</h1>
          <div>Your payment request has been received successfuly</div>
        </div>
        <div class="row my-4 py-3 shadow-lg bg-white radius-3">
          <div class="col-lg-2 col-md-3 col-sm-3">
            <div class="image">
              <img src="../../../assets/images/mobile-alert.svg" alt="mobile" />
            </div>
          </div>
          <div class="col-lg-10 col-md-9 col-sm-9">
            <h3>Confirm Mobile Money Payment</h3>
            <div>To complete the payment, check a popup message on your mobile phone and follow instrustions</div>
          </div>
        </div>
        <div class="row my-4 py-3 shadow-lg bg-white radius-3">
          <div class="col-lg-2 col-md-3 col-sm-3">
            <div class="image">
              <img src="../../../assets/images/mail-alert.svg" alt="mobile" />
            </div>
          </div>
          <div class="col-lg-10 col-md-9 col-sm-9">
            <h3>Email notification</h3>
            <div>You should receive an email detailing your purchase order</div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>


<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Loading from "./../../../components/commons/Loading";
import Datetime from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
Vue.use(Datetime);
const account_layout = "account";

export default {
  name: "HiringProcess",
  component: {
    datetime: Datetime,
    Loading
  },
  data() {
    return {
      dev: false,
      loaded: false,
      submitDisable: false,
      isStepOne: true,
      selectedService: 0,
      month: null,
      monthsArray: [
        { value: null, text: "select month" },
        { value: 1, text: "1 month" },
        { value: 2, text: "2 months" },
        { value: 3, text: "3 months" }
      ],
      minDatetime: new Date().toISOString().slice(0, 10),
      info: {
        learnerId: "",
        serviceId: "",
        startingDate: new Date().toISOString().slice(0, 10),
        endingDate: "",
        phone: "250788867447",
        promo: null,
        total: 0
      },
      initialAmount: 0,
      period: {
        type: "day",
        count: 1
      },
      currentTitle: "Tutor"
    };
  },
  mounted() {
    this.loaded = true;
    this.info.endingDate = this.info.startingDate;
  },
  created() {
    this.FETCH_TUTOR(this.$route.params.username);
    this.FETCH_USER(JSON.parse(localStorage.getItem("user")).username);
  },
  computed: {
    profile() {
      return this.$store.getters.profile;
    },
    auth() {
      return JSON.parse(localStorage.getItem("isAuth"));
    },
    fetch_tutor() {
      return this.$store.getters.fetch_tutor;
    },
    fetch_user() {
      return this.$store.getters.fetch_user;
    },
    getPayment() {
      return this.$store.getters.getPayment;
    },
    ...mapGetters(["fetch_user", "getPayment"]),
    layout() {
      return (this.$route.meta.layout || account_layout) + "-layout";
    }
  },
  methods: {
    goTo(step) {
      this.steps = {
        zero: false,
        one: false,
        two: false,
        three: false
      };
      Object.entries(this.steps).forEach((element, index) => {
        if (element[0] === step) {
          this.steps[step] = true;
        }
      });
      this.$store.dispatch("RESET_FETCH_USER");
    },
    select(id, type, count, total) {
      if (this.info.startingDate && this.month) {
        this.selectedService = id;
        let currentDate = new Date(this.info.startingDate);
        let nextDate = "";
        this.info.endingDate = new Date(
          currentDate.setMonth(currentDate.getMonth() + this.month)
        ).toISOString();
        this.info.serviceId = id;
        this.info.total = total * this.month;
        this.initialAmount = total;
      } else {
        Vue.$toast.open({
          message:
            "Please, select a starting date first and how long you want the service",
          type: "error",
          position: "top"
        });
      }
    },
    listenDateChange(e) {
      this.info.endingDate = new Date(e).toISOString();
    },
    listenPeriodChange(value) {
      console.log("init", value, this.initialAmount);
      if (value && this.initialAmount) {
        this.month = value;
        this.info.total = this.initialAmount * this.month;
      }
    },
    paynow() {
      this.PROCESS_PAYMENT(this.info);
    },
    ...mapActions(["FETCH_TUTOR", "FETCH_USER", "PROCESS_PAYMENT"])
  }
};
</script>

<style scoped>
.process-payment-loading {
  position: fixed;
  z-index: 19000000;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: #ffffff;
  align-items: center;
  text-align: center;
  display: flex;
}
.process-payment {
  margin: 0 auto;
  display: block;
}
.process-payment img {
  margin: 25px auto;
  max-width: 120px;
  -webkit-animation-name: animate-bag;
  animation-name: animate-bag;
  -webkit-animation-duration: 2s;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-duration: 2s;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  opacity: 1;
}
@keyframes animate-bag {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}
.customizer-wrapper {
  max-width: 640px;
  margin: 0 auto;
  display: block;
}
.content-steps {
  margin: 0 auto;
  display: block;
  max-width: 1000px;
}
.submit-disabled {
  opacity: 0.3;
}
.hire-process-box {
  width: 96%;
  margin: 15px 1% 0px 1%;
  padding: 8px 1%;
  border-radius: 4px !important;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  text-align: center;
}
.hire-process-box img {
  width: 45px;
  margin-top: 5px;
}
.hire-process-box span {
  position: relative;
  display: block;
  text-align: center;
  padding-top: 13px;
  font-weight: 100 !important;
}
.hire-process-box.active {
  color: #403ea8;
}
.hire-process-box img {
  max-width: 40px;
  margin-left: 4px;
}
.image-identity img {
  max-width: 80px !important;
  margin: 15px auto;
  display: block;
}
.wrap-sp {
  margin: 0;
  width: 100%;
}
.wrap-sp img {
  width: 60px;
  max-width: 33%;
  float: left;
  margin: 0 15px 0 0;
  padding: 5px;
  background: #ffffff;
  border: 2px solid #000000;
}
.payment-summary {
  border: 4px solid #232323;
}
</style>
