<template>
  <div
    class="bg-black flex items-center justify-between px-16 text-secondary relative p-6"
  >
    <img
      src="~/assets/images/logo.svg"
      alt="Kambista logo"
      class="cursor-pointer w-56"
      @click="handleRedirect"
    />
    <div>
      <NuxtLink
        to="/nosotros"
        class="text-gray-100 text-2xl px-4 py-3 hover:font-semibold"
        >Nosotros</NuxtLink
      >
      <NuxtLink
        to="/blog"
        class="text-gray-100 text-2xl px-4 py-3 hover:font-semibold"
        >Blog</NuxtLink
      >
      <NuxtLink
        to="/ayuda"
        class="text-gray-100 text-2xl px-4 py-3 hover:font-semibold"
        >Ayuda</NuxtLink
      >
      <NuxtLink
        to="/login"
        class="text-2xl bg-primary opacity-90 rounded-full p-4 hover:opacity-100"
        >Regístrate</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const handleRedirect = (path) => {
  router.push({ path: `/` });
};
</script>
