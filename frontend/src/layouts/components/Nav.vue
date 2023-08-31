<template>
  <div>
    <div
      class="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-sm font-semibold bg-white divide-y shadow-xl text-gray-60"
    >
      <div class="intro-x flex justify-end items-center py-3.5 px-6">
        <img
          src="~/assets/icons/XIcon.png"
          alt="x icon"
          class="w-12 h-12 cursor-pointer p-1.5 rounded-full text-secondary hover:bg-gray-100"
          @click="onMenu"
        />
      </div>
      <NuxtLink to="/nosotros" class="px-6 py-4 intro-x hover:bg-gray-100"
        >Nosotros</NuxtLink
      >
      <NuxtLink to="/blog" class="px-6 py-4 intro-x hover:bg-gray-100"
        >Blog</NuxtLink
      >
      <NuxtLink to="/ayuda" class="px-6 py-4 intro-x hover:bg-gray-100"
        >Ayuda</NuxtLink
      >
      <hr />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  onMenu: {
    type: Function,
    default() {
      return {};
    },
  },
});
</script>
