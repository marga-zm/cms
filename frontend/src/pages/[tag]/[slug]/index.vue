<template>
  <BaseLayout>
    <div v-if="articleHtml" class="p-4 lg:px-32 mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-2 mt-12">
        <div>
          <figure>
            <img
              :src="articleImage?.url"
              :alt="articleImage?.alternativeText || 'imagen blog'"
            />
            <figcaption class="text-gray-60 text-center">
              {{ articleImage?.caption }}
            </figcaption>
          </figure>
          <div class="mt-8">
            <h1 class="text-2xl font-bold">
              {{ dataArticle?.attributes?.title }}
            </h1>
            <div v-html="articleHtml" id="contentWrapper"></div>
          </div>
        </div>
        <div>
          <div class="mt-8 lg:mt-0">
            <h3 class="text-center">
              Tipo de Cambio del <b>dólar</b> hoy en Perú
            </h3>
            <km-calculator />
            <button
              class="font-bold w-48 mx-auto block bg-primary opacity-90 rounded-full p-4 hover:opacity-100"
            >
              Ir a Kambista
            </button>
          </div>
          <div class="mt-8">
            <h3 class="font-bold text-lg text-center">
              {{ relatedArticles.title }}
            </h3>
            <div v-for="article in relatedArticles.articles" :key="article.id">
              <div
                class="bg-gray-21 w-[60%] min-w-[300px] max-w-[400px] cursor-pointer rounded-xl overflow-hidden m-4 mx-auto"
                @click="
                  handleRedirect(
                    `${article.attributes.tag.toLowerCase()}/${
                      article.attributes.slug
                    }`,
                  )
                "
              >
                <img
                  :src="getImageUrl(article.attributes)"
                  alt="blog-image"
                  class="w-full min-h-[100px] max-h-[150px]"
                />
                <div class="px-4">
                  <span class="font-bold text-xs rounded p-2 bg-primary">{{
                    article.attributes.tag
                  }}</span>
                  <p class="font-bold my-4">{{ article.attributes.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    const route = useRoute();
    const dataArticle = ref({});
    const articleHtml = ref();
    const articleImage = ref();
    const relatedArticles = ref({});
    const router = useRouter();

    const slug = route.params.slug;

    const getInitialDataArticle = async () => {
      try {
        const {
          data: { data },
        } = await $services.customer.filterArticleBySlug(slug);

        dataArticle.value = data;
        articleHtml.value = micromark(data?.attributes.content, {
          extensions: [gfm({ syntax: true })],
        });
        articleImage.value = data?.attributes.image.data.attributes;
        relatedArticles.value = {
          title: data.attributes.relatedArticles?.title,
          articles: data.attributes.relatedArticles?.articles?.data,
        };
      } catch (error) {
        console.log(error);
      }
    };

    const applyStylesToOrderedList = () => {
      const wraper = document.getElementById("contentWrapper");
      if (wraper) {
        const olElements = wraper.querySelectorAll("ol");
        olElements.forEach((olElement) => {
          olElement.style.listStyleType = "decimal";
          olElement.style.paddingLeft = "16px";
          olElement.style.paddingLeft = "16px";
        });
      }
    };

    const applyStylesToSubtitle = () => {
      const wraper = document.getElementById("contentWrapper");
      if (wraper) {
        const elements = [
          ...wraper.querySelectorAll("h2"),
          ...wraper.querySelectorAll("h3"),
        ];
        elements.forEach((element) => {
          element.style.fontSize = "20px";
          element.style.fontWeight = "bold";
          element.style.margin = "8px 0px 8px 0px";
        });
      }
    };

    const applyStylesToParagraph = () => {
      const wraper = document.getElementById("contentWrapper");
      if (wraper) {
        const elements = wraper.querySelectorAll("p");
        elements.forEach((element) => {
          element.style.margin = "4px 0px 4px 0px";
        });
      }
    };

    const handleRedirect = (path) => {
      router.push({ path: `/${path}` });
    };

    const getImageUrl = (attributes) => {
      return attributes.image?.data.attributes.url;
    };

    onMounted(async () => {
      await getInitialDataArticle();
      nextTick(() => {
        applyStylesToOrderedList();
        applyStylesToSubtitle();
        applyStylesToParagraph();
      });
    });

    watch(getInitialDataArticle);

    return {
      dataArticle,
      articleHtml,
      articleImage,
      relatedArticles,
      getImageUrl,
      handleRedirect,
    };
  },
});
</script>

<style scoped>
.order-list-style {
  padding-left: 8px;
}
</style>
