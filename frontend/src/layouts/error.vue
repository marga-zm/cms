<template>
  <ErrorPage />
</template>
<script>
export default {
  name: "NuxtError",
  props: {
    error: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
