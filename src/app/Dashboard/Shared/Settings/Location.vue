<template>
  <div>
    <div v-if="!loaded" class="grab-page-loading"></div>
    <div v-if="loaded">
      <div class="py-2">
        <div class="float-left my-3">
          <div
            class="float-left bg-danger text-light py-2 px-3 mr-1 mb-3 radius-2"
          >
            <icon class="icon" icon="map-marker-alt" />
          </div>
          <span>
            <div
              class="float-left border border-gray bg-light py-2 px-3 mr-1 mb-3 radius-2"
            >Province:{{province}}</div>
            <div
              v-if="isDistrictOff"
              class="float-left border border-gray bg-light py-2 px-3 mr-1 mb-3 radius-2"
            >District:{{district}}</div>
            <div
              v-if="isSectorOff"
              class="float-left border border-gray bg-light py-2 px-3 mr-1 mb-3 radius-2"
            >Sector:{{sector}}</div>
            <div
              v-if="isCellOff"
              class="float-left border border-gray bg-light py-2 px-3 mr-1 mb-3 radius-2"
            >Cell:{{cell}}</div>
            <br />
            <button
              v-on:click="startEditing()"
              v-if="!editing && fetch_user.location"
              class="btn btn-success radius-1 mt-2 ml-5 px-3"
            >
              <icon class="icon" icon="edit" />&nbsp; Edit
            </button>
          </span>
          <span>
            <button
              v-on:click="startEditing()"
              v-if="!editing && !fetch_user.location"
              class="btn btn-success radius-1 ml-1 px-3"
            >
              <icon class="icon" icon="edit" />&nbsp; Set your location
            </button>
          </span>
        </div>
        <form class="mt-3" v-if="editing" method="post">
          <div class="form-group">
            <label class="bold" for="province">Province</label>
            <select class="form-control" v-model="province" @change="provincesOnChange">
              <option disabled value>Please select one</option>
              <option v-for="province in provinces" :key="province.index">{{province}}</option>
            </select>
          </div>
          <div class="form-group" v-if="isDistrictOff">
            <label class="bold" for="district">District</label>
            <select class="form-control" v-model="district" @change="districtsOnChange">
              <option disabled value>Please select one</option>
              <option v-for="district in districts" :key="district.index">{{district}}</option>
            </select>
          </div>
          <div class="form-group" v-if="isSectorOff">
            <label class="bold" for="sector">Sector</label>
            <select class="form-control" v-model="sector" @change="sectorsOnChange">
              <option disabled value>Please select one</option>
              <option v-for="sector in sectors" :key="sector.index">{{sector}}</option>
            </select>
          </div>
          <div class="form-group" v-if="isCellOff">
            <label class="bold" for="cell">Cell</label>
            <select class="form-control" v-model="cell" @change="cellsOnChange">
              <option disabled value>Please select one</option>
              <option v-for="cell in cells" :key="cell.index">{{cell}}</option>
            </select>
          </div>
          <div class="my-3">
            <button
              type="submit"
              :disabled="!isCellOn"
              @click.prevent
              @click="saveLocation"
              class="btn btn-primary bg-primary rounded px-4"
            >Save</button>
          </div>
          <div
            class="alert alert-success my-2"
            v-show="fetch_user && fetch_user.message && fetch_user.location_updated"
          >{{fetch_user.message}}</div>

          <div
            class="row m-0"
            v-if="fetch_user && fetch_user.location_updated && fetch_user.errors"
          >
            <div
              class="alert alert-danger"
              v-for="error in fetch_user.errors"
              :key="error.index"
            >{{error}}</div>
          </div>
        </form>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import {
  Provinces,
  Districts,
  Sectors,
  Cells,
  Villages,
  District,
  Sector,
  Cell,
  Village
} from "rwanda";
export default {
  name: "ProfileUserLocation",
  props: ["location"],
  data() {
    return {
      loaded: false,
      editing: false,
      provinces: "",
      province: "",
      isDistrictOff: false,
      districts: "",
      district: "",
      isSectorOff: false,
      sectors: "",
      sector: "",
      isCellOff: false,
      cells: "",
      cell: "",
      isCellOn: false,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  mounted() {
    this.loaded = true;
    this.provinces = Provinces();
    this.province = this.location.province;
    this.district = this.location.district;
    this.sector = this.location.sector;
    this.cell = this.location.cell;
    if (this.district) {
      this.isDistrictOff = true;
    }
    if (this.sector) {
      this.isSectorOff = true;
    }
    if (this.cell) {
      this.isCellOff = true;
    }
  },
  computed: {
    fetch_user() {
      return this.$store.getters.fetch_user;
    },
    ...mapGetters(["fetch_user"])
  },
  methods: {
    startEditing() {
      this.editing = !this.editing;
      this.isDistrictOff = false;
      this.isSectorOff = false;
      this.isCellOff = false;
    },
    provincesOnChange(e) {
      this.isDistrictOff = true;
      this.isSectorOff = false;
      this.isCellOff = false;
      this.isCellOn = false;
      this.districts = District(e.target.value.toLowerCase());
    },
    districtsOnChange(e) {
      this.sector = "";
      this.isSectorOff = true;
      this.isCellOn = false;
      this.sectors = Sector(this.province, e.target.value);
    },
    sectorsOnChange(e) {
      this.cell = "";
      this.isCellOff = true;
      this.isCellOn = false;
      this.cells = Cell(
        this.province.toLowerCase(),
        this.district.toLowerCase(),
        e.target.value.toLowerCase()
      );
    },
    cellsOnChange(e) {
      this.isCellOn = true;
      this.cell = e.target.value;
    },
    saveLocation() {
      this.$toast.open({
        message: "Loading...",
        type: "warning"
      });
      const data = {
        province: this.province,
        district: this.district,
        sector: this.sector,
        cell: this.cell
      };
      this.UPDATE_USER_LOCATION(data);
    },
    ...mapActions(["UPDATE_USER_LOCATION"])
  }
};
</script>

<style scoped>
</style>
