<template>
  <div class="container">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <nav
      class="pagination is-fixed-bottom navbar mb-5 mx-5"
      role="navigation"
      aria-label="pagination"
    >
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        class="pagination-previous"
        v-if="page != 1"
        >Previous</router-link
      >
      <router-link
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        class="pagination-next"
        v-if="hasNextPage"
        >Next page</router-link
      >
      <ul class="pagination-list">
        <li v-for="x in totalPages" :key="x" :aria-label="'Goto page' + page">
          <router-link
            :to="{ name: 'EventList', query: { page: x } }"
            class="pagination-link"
            :class="{ 'is-current': x == page }"
            >{{ x }}</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard";
import EventService from "../services/EventService";
// import { watchEffect } from "vue";
export default {
  name: "EventList",
  components: {
    EventCard,
  },
  props: ["page"],
  data() {
    return {
      events: null,
      totalEvents: null,
    };
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(parseInt(routeTo.query.page) || 1)
      .then((res) => {
        next((comp) => {
          comp.events = res.data;
          comp.totalEvents = res.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
  },
  beforeRouteUpdate(routeTo) {
    return EventService.getEvents(parseInt(routeTo.query.page) || 1)
      .then((res) => {
        this.events = res.data;
        this.totalEvents = res.headers["x-total-count"];
      })
      .catch(() => {
        return { name: "NetworkError" };
      });
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEvents / 2);
    },
    hasNextPage() {
      return this.page < this.totalPages;
    },
  },
};

//  created() {
//     watchEffect(() => {
//       this.events = null;
//       EventService.getEvents(this.page)
//         .then((res) => {
//           this.events = res.data;
//           this.totalEvents = res.headers["x-total-count"];
//         })
//         .catch(() => {
//           this.$router.push({ name: "NetworkError" });
//         });
//     });
</script>
