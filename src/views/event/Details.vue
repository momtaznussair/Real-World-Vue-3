<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <span>Organizer: {{ event.organizer }}</span>
</template>

<script>
export default {
  props: ["event"],
};
</script>
