<template>
  <BaseLayout>
    <div class="flex justify-evenly items-center">
      <div style="height: 180px">
        <h1 class="text-2xl font-bold max-w-lg">
          Sección de <span class="capitalize">{{ sectionTitle }}</span>
        </h1>
      </div>
      <div style="height: 180px">
        <km-calculator />
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout";
import { onMounted, ref, watch } from "vue";

export default defineComponent({
  components: { BaseLayout },
  setup() {
    const { $services } = useNuxtApp();
    const route = useRoute();

    const dataBlog = ref([]);
    const getInitialDataBlog = async () => {
      try {
        const {
          data: {
            _rawValue: { data },
          },
        } = await $services.customer.getArticles();
        dataBlog.value = data;
        console.log(dataBlog.value);
      } catch (error) {
        console.log(error);
      }
    };
    const sectionTitle = route.params.slug;

    onMounted(async () => {
      // await getInitialDataBlog();
    });
    // watch(getInitialDataBlog);
    return {
      dataBlog,
      sectionTitle,
    };
  },
});
</script>
