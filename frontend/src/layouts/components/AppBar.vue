<template>
  <div
    class="bg-black flex items-center justify-between px-16 text-secondary relative p-4 lg:p-6"
  >
    <img
      src="~/assets/images/logo.svg"
      alt="Kambista logo"
      class="cursor-pointer w-44 lg:w-48"
      @click="handleRedirect"
    />
    <div class="lg:hidden">
      <slot name="nav">
        <LeftIcon class="w-12 h-12 cursor-pointer p-1.5" @click="onMenu" />
        <template v-if="menu">
          <Nav :on-menu="onMenu" />
        </template>
      </slot>
    </div>
    <div class="hidden lg:block">
      <NuxtLink
        to="/nosotros"
        class="text-gray-100 text-xl px-4 py-3 hover:font-semibold"
        >Nosotros</NuxtLink
      >
      <NuxtLink
        to="/blog"
        class="text-gray-100 text-xl px-4 py-3 hover:font-semibold"
        >Blog</NuxtLink
      >
      <NuxtLink
        to="/ayuda"
        class="text-gray-100 text-xl px-4 py-3 hover:font-semibold"
        >Ayuda</NuxtLink
      >
      <NuxtLink
        to="/login"
        class="text-xl bg-primary opacity-90 rounded-full p-4 hover:opacity-100"
        >Regístrate</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import Nav from "~/layouts/components/Nav.vue";
import LeftIcon from "~/assets/icons/LeftIcon.vue";

import { onMounted, ref, watch } from "vue";

const router = useRouter();

let menu = ref(false);

const onMenu = () => {
  menu.value = !menu.value;
};

const handleRedirect = (path) => {
  router.push({ path: `/` });
};
</script>
