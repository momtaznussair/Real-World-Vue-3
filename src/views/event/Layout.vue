<template>
  <article
    v-if="event"
    class="message is-primary column is-two-thirds is-narrow event mx-auto"
  >
    <div class="message-header">
      <strong>{{ event.title }}</strong>
    </div>
    <div class="message-body">
      <nav class="level">
        <p class="level-item has-text-centered">
          <router-link :to="{ name: 'EventDetails' }" class="link">
            Details
          </router-link>
        </p>

        <p class="level-item has-text-centered">
          <router-link :to="{ name: 'EventRegister' }" class="link">
            Register
          </router-link>
        </p>

        <p class="level-item has-text-centered">
          <router-link :to="{ name: 'EventEdit' }" class="link">
            Edits
          </router-link>
        </p>
      </nav>
      <router-view :event="event" />
    </div>
  </article>
</template>

<script>
import EventService from "../../services/EventService";
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
        if (err.response && err.response.status == 404) {
          return this.$router.push({
            name: "NotFoundResource",
            params: { resource: "event" },
          });
        }
        this.$router.push({ name: "NetworkError" });
      });
  },
};
</script>
