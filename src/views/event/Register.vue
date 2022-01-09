<template>
  <p>Register</p>
  <pre class="my-4">
    Cool


    Registeration



    Form
  </pre>
  <button @click="register" class="button is-rounded is-primary">
    Register
  </button>
</template>

<script>
export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      //if registration successfull
      this.GStore.flashMessage =
        "You are successfully registerd for" + this.event.title;
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
      this.$router.replace({
        name: "EventDetails",
      });
    },
  },
};
</script>
