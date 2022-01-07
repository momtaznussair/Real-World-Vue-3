<template>
  <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
    <article
      class="box is-primary event column is-one-third is-clickable mx-auto my-2"
      style="height: 30vh"
    >
      <div class="py-6">
        <strong>{{ event.title }}</strong>
        <p>@ {{ event.time }} - {{ event.date }}</p>
      </div>
    </article>
  </router-link>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: Object,
  },
};
</script>

<style scoped>
.event:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
