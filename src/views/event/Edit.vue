<template>
  <p>Edit Event</p>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      unsavedChanges: true,
    };
  },
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        "Are you Sure ?, You have unsaved changes."
      );
      return answer;
    }
    return true;
  },
};
</script>
