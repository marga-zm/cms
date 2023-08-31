<template>
  <BaseLayout>
    <div class="px-4">
      <div class="flex justify-evenly items-center">
        <div
          v-html="titleHtml"
          id="contentWrapper"
          class="lg:max-w-xl flex justify-center items-center mt-8"
        ></div>
        <km-calculator v-if="dataBlogPage.showCalculator" />
      </div>
      <div class="mt-8 flex justify-center items-center">
        <div v-if="articles.length">
          <h2 class="text-xl font-bold text-center mb-4">Lista de blogs</h2>
          <div class="flex flex-wrap justify-center gap-2 md:gap-4">
            <div v-for="{ id, attributes } in articles" :key="id">
              <div
                class="bg-gray-21 w-full lg:w-80 h-72 cursor-pointer rounded-xl overflow-hidden"
                @click="
                  handleRedirect(
                    `${attributes.tag.toLowerCase()}/${attributes.slug}`,
                  )
                "
              >
                <img
                  :src="getImageUrl(attributes)"
                  alt="blog-image"
                  class="w-full min-h-[120px] max-h-[200px] md:max-h-[250px]"
                />
                <div class="px-4">
                  <span class="font-bold text-xs rounded p-2 bg-primary">{{
                    attributes.tag
                  }}</span>
                  <p class="font-bold my-4">{{ attributes.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Banner
      v-if="showBanner"
      :open="showBanner"
      variant="secondary"
      bottom="4%"
      left="4%"
      animation="left"
      @close="closeBanner"
      custom
    >
      <template #header>
        <div
          class="cursor-pointer absolute top-3 right-3 flex justify-between z-[60]"
          @click="closeBanner"
        >
          X
        </div>
      </template>
      <template #content>
        <img
          :src="bannerImage"
          alt="banner-koinks"
          class="cursor-pointer w-full"
        />
      </template>
    </Banner>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { micromark } from "micromark";
import { gfm } from "micromark-extension-gfm";
import Banner from "@/shared/Banner";

export default defineComponent({
  components: { BaseLayout, Banner },
  setup() {
    const { $services } = useNuxtApp();
    const router = useRouter();

    const articles = ref([]);
    const dataBlogPage = ref({});
    const titleHtml = ref();
    const showBanner = ref(false);
    const bannerImage = ref("");

    const getArticles = async () => {
      try {
        const {
          data: { data },
        } = await $services.customer.getArticles();
        articles.value = data;
        console.log(articles.value);
      } catch (error) {
        console.log(error);
      }
    };

    const getInitialDataBlogPage = async () => {
      try {
        const {
          data: {
            data: { attributes },
          },
        } = await $services.customer.getBlogPage();
        dataBlogPage.value = attributes;
        titleHtml.value = micromark(attributes.title, {
          extensions: [gfm({ syntax: true })],
        });
        showBanner.value = attributes?.banner?.active;
        bannerImage.value = attributes?.banner?.image.data.attributes.url;
      } catch (error) {
        console.log(error);
      }
    };

    const handleRedirect = (path) => {
      router.push({ path: path });
    };

    const closeBanner = () => {
      showBanner.value = false;
    };

    const applyStylesToTitle = () => {
      const wraper = document.getElementById("contentWrapper");
      if (wraper) {
        const element = wraper.querySelector("h1");
        element.style.fontSize = "40px";
        element.style.textAlign = "center";
      }
    };

    const getImageUrl = (attributes) => {
      console.log(attributes);
      return attributes.image.data.attributes.url;
    };

    onMounted(async () => {
      await getArticles();
      await getInitialDataBlogPage();
      nextTick(() => {
        applyStylesToTitle();
      });
    });

    watch(getArticles, getInitialDataBlogPage);

    return {
      articles,
      dataBlogPage,
      titleHtml,
      handleRedirect,
      getImageUrl,
      showBanner,
      bannerImage,
      closeBanner,
    };
  },
});
</script>
