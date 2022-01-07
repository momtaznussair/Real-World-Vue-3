<template>
  <article
    v-if="event"
    class="message is-primary column is-two-thirds is-narrow is-clickable event mx-auto"
  >
    <div class="message-header">
      <strong>{{ event.title }}</strong>
    </div>
    <div class="message-body">
      <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
      <p>{{ event.description }}</p>
      <span>Organizer: {{ event.organizer }}</span>
    </div>
  </article>
</template>

<script>
import EventService from "../services/EventService";
export default {
  props: ["id"],
  data() {
    return {
      event: null,
    };
  },
  created() {
    EventService.getEvent(this.id)
      .then((res) => {
        this.event = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>
