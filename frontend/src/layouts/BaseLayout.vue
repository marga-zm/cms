<template>
  <client-only>
    <div class="relative flex flex-col min-h-screen bg-gray-10">
      <AppBar />
      <div class="pb-20">
        <slot></slot>
      </div>
    </div>
  </client-only>
</template>
<script>
import AppBar from "./components/AppBar";

export default {
  name: "BaseLayout",
  components: {
    AppBar,
  },
};
</script>
