<template>
  <div class="shadow-2 bg-white radius-2 p-3 mt-4" slot-scope="availability">
    <h4 class="my-2">My availability</h4>
    <div class="row">
      <table class="table table-borderless">
        <thead>
          <tr class="text-center">
            <th scope="col">&nbsp;</th>
            <th>Morning</th>
            <th scope="col">Afternoon</th>
            <th scope="col">Evening</th>
          </tr>
        </thead>
        <tbody>
          <tr class="nobold">
            <th>Monday</th>
            <td>
              <span v-if="availability.monday.morning" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.monday.afternoon" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.monday.evening" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
          </tr>
          <tr class="nobold">
            <th>Tuesday</th>
            <td>
              <span v-if="availability.tuesday.morning" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.tuesday.afternoon" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.tuesday.evening" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
          </tr>
          <tr class="nobold">
            <th>Wednesday</th>
            <td>
              <span v-if="availability.wednesday.morning" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.wednesday.afternoon" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.wednesday.evening" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
          </tr>
          <tr class="nobold">
            <th>Thursday</th>
            <td>
              <span v-if="availability.thursday.morning" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.thursday.afternoon" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.thursday.evening" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
          </tr>
          <tr class="nobold">
            <th>Friday</th>
            <td>
              <span v-if="availability.friday.morning" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.friday.afternoon" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.friday.evening" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
          </tr>
          <tr class="nobold">
            <th>Saturday</th>
            <td>
              <span v-if="availability.saturday.morning" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.saturday.afternoon" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-success" icon="check" />
              </span>
            </td>
            <td>
              <span v-if="availability.saturday.evening" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-danger" icon="dot-circle" />
              </span>
            </td>
          </tr>
          <tr class="nobold">
            <th>Sunday</th>
            <td>
              <span v-if="availability.sunday.morning" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-danger" icon="dot-circle" />
              </span>
            </td>
            <td>
              <span v-if="availability.sunday.afternoon" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-danger" icon="dot-circle" />
              </span>
            </td>
            <td>
              <span v-if="availability.sunday.evening" class="checked">
                <icon class="icon text-success" icon="check" />
              </span>
              <span v-else>
                <icon class="icon text-danger" icon="dot-circle" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAvailability",
  props: ["availability"],
  computed: {},
  created() {
    this.getAvailability();
  },
  methods: {
    getAvailability() {
      this.availability = JSON.parse(this.availability);
    }
  }
};
</script>

<style>
.table th {
  font-weight: 100 !important;
}
.table span {
  display: block;
  padding: 4px 0 !important;
  width: 98%;
  margin: 1%;
  text-align: center;
  border-radius: 5px !important;
}
.table span.checked {
  background: #509065;
  color:#ffffff
}
.table tr {
  margin: 4px 0;
}
</style>