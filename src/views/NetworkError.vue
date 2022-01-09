<template>
  <h1>Uh-oh!</h1>
  <p>Looks Like You have network issues!</p>
  <p>Take a breath and try again <a @click="$router.go(-1)">Click Here</a></p>
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
