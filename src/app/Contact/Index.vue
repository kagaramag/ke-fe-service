<template>
  <div>
    <component :is="layout">
      <section id="contact" class="bg-light my-4">
        <!-- what drives us? -->
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div class="p-4 my-3 radius-2 bg-white shadow-3">
                <h1 class="font-weight-light my-2">
                  <span class="bold">Contact us</span>
                  <br />
                </h1>
                <div class="py-1">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div>
                        If you have any issues, concerns, feedback or questions.
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div>Address: Kigali, Rwanda</div>
                    </li>
                    <li class="list-group-item">
                      <div>Tel: +250-788-867-447</div>
                    </li>
                    <li class="list-group-item">
                      <div>Email: support@keetela.com</div>
                    </li>
                    <li class="list-group-item">
                      <h4>Social Media</h4>
                      <div>
                        <router-link
                          class="btn btn-dark px-3 radius-1"
                          :to="'/'"
                        >
                          <icon :icon="['fab', 'linkedin']" class="icon" />
                          Keetela
                        </router-link>
                        <router-link
                          class="btn btn-dark px-3 radius-1"
                          :to="'/'"
                        >
                          <icon :icon="['fab', 'instagram']" class="icon" />
                          Keetela
                        </router-link>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <h4>Send Us Feedback</h4>
                      We love to hear from our users! If you have any
                      suggestions, clarification or inquiry, please send us an
                      email right away.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="my-4">
                <img
                  src="./../../assets/images/contact.svg"
                  class="card-img-top center"
                  alt="about us"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
export default {
  name: "contact",
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  }
};
</script>

<style scoped>
#drivers {
  width: 100%;
  padding: 10vh 0;
}
.one-step img {
  max-width: 90px;
  display: block;
  margin: 0 auto;
}
.one-step h2 {
  font-size: 3em;
}
</style>
