<script setup>
import { ref } from "vue";

const props = defineProps({
  seo: { type: Object, default: () => {} },
});

const metaImage = ref();
const twitter = ref({});
const facebook = ref({});

metaImage.value = props.seo.metaImage?.data?.attributes?.url;

const getSocialNetwork = (social) =>
  props.seo.metaSocial.find(
    (socialNetwork) => socialNetwork.socialNetwork === social,
  ) || {};

const twitterImage = getSocialNetwork("Twitter").image?.data.attributes;
twitter.value = {
  title: getSocialNetwork("Twitter").title,
  description: getSocialNetwork("Twitter").description,
  image: {
    urlImage: twitterImage.url,
    alt: twitterImage.alternativeText,
  },
};

const facebookImage = getSocialNetwork("Facebook").image?.data.attributes;
facebook.value = {
  title: getSocialNetwork("Facebook").title,
  description: getSocialNetwork("Facebook").description,
  image: {
    urlImage: facebookImage?.url,
    alt: facebookImage?.alternativeText,
    width: facebookImage.width,
    height: facebookImage.height,
    type: facebookImage.mime,
  },
};

console.log(props.seo.typeContent);

useHead({
  meta: [
    { name: "description", content: props.seo.metaDescription },
    { name: "keywords", content: props.seo.keywords },
    { name: "author", content: "Kambista" },
    { itemprop: "name", content: props.seo.metaTitle },
    { itemprop: "description", content: props.seo.metaDescription },
    { itemprop: "image", content: metaImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "Kambista" },
    { name: "twitter:creator", content: "@kambistaperu" },
    { name: "twitter:title", content: twitter.value.title },
    {
      name: "twitter:description",
      content: twitter.value.description,
    },
    { name: "twitter:image", content: twitter.value.image?.urlImage },
    { name: "twitter:image:alt", content: twitter.value.image?.alt },
    { property: "og:locale", content: "es_ES" },
    { property: "og:type", content: props.seo.typeContent },
    { property: "og:title", content: facebook.value.title },
    {
      property: "og:description",
      content: facebook.value.description,
    },
    { property: "og:url", content: props.seo.canonicalURL },
    { property: "og:site_name", content: "Kambista" },
    { property: "og:image", content: facebook.value.image?.urlImage },
    {
      property: "og:image:width",
      content: facebook.value.image?.width,
    },
    {
      property: "og:image:height",
      content: facebook.value.image?.height,
    },
    {
      property: "og:image:type",
      content: facebook.value.image?.type,
    },
    { property: "article:published_time", content: props.seo.createdAt },
    { property: "article:modified_time", content: props.seo.updatedAt },
    { property: "article:section", content: props.seo.metaDescription },
    { property: "article:tag", content: props.seo.tag },
    { property: "twitter:label1", content: "Escrito por" },
    { property: "twitter:data1", content: "MarketingKambista" },
    { property: "twitter:label2", content: "Tiempo de lectura" },
    {
      property: "twitter:data2",
      content: props.seo.readingTime || "5 minutos",
    },
  ],
  link: [{ rel: "canonical", href: props.seo.canonicalURL }],
});
</script>
