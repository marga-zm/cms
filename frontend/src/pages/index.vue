<template>
  <BaseLayout>
    <div class="bg-blue-gradient w-screen h-screen">
      <div
        class="container h-[80vh] flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center px-4 lg:px-12 pt-20 lg:pt-0"
      >
        <div
          v-html="titleHtml"
          id="contentWrapper"
          class="lg:max-w-xl flex justify-center items-center"
        ></div>
        <km-calculator v-if="dataHomePage?.showCalculator" />
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout";
import { onMounted, ref, watch } from "vue";
import { micromark } from "micromark";
import { gfm } from "micromark-extension-gfm";

export default defineComponent({
  components: { BaseLayout },
  setup() {
    const { $services } = useNuxtApp();

    const titleHtml = ref();

    const dataHomePage = ref({
      Header: {},
      banner: {},
      seo: {},
      showCalculator: false,
      message: "",
    });
    const getInitialDataHome = async () => {
      try {
        const {
          data: {
            data: { attributes },
          },
        } = await $services.customer.getHomePage();
        dataHomePage.value = attributes;
        titleHtml.value = micromark(attributes.title, {
          extensions: [gfm({ syntax: true })],
        });
      } catch (error) {
        console.log(error);
      }
    };

    const applyStylesToTitle = () => {
      const wraper = document.getElementById("contentWrapper");
      if (wraper) {
        const element = wraper.querySelector("h1");
        element.style.fontSize = "40px";
        element.style.color = "white";
        element.style.textAlign = "center";
      }
    };

    onMounted(async () => {
      await getInitialDataHome();
      nextTick(() => {
        applyStylesToTitle();
      });
    });

    watch(getInitialDataHome);

    return {
      dataHomePage,
      titleHtml,
    };
  },
});
</script>
