<template>
  <article
    v-if="GStore.flashMessage"
    id="flashMessage"
    class="message is-success column is-one-quarter"
  >
    <div class="message-header">
      <p>Success</p>
    </div>
    <div class="message-body">{{ GStore.flashMessage }}</div>
  </article>
  <div id="nav">
    <router-link to="/">Events</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>
<script>
export default {
  inject: ["GStore"],
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #83cfad;
}
#flashMessage {
  z-index: 1000;
  position: absolute;
  right: 1rem;
  top: 1rem;
  opacity: 0.8;
}
@import "~bulma/css/bulma.css";
</style>
