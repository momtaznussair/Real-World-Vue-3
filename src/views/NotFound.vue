<template>
  <h1>Ooops!</h1>
  <p>Looks Like Your Lost!</p>
  <p>The {{ resource }} you're looking for is Not Found.</p>
  <router-link to="/">Go To Home</router-link>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
};
</script>
