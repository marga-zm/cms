<template>
  <BaseLayout>
    <div class="mx-auto max-w-lg">
      <p class="text-lg font-bold text-center">{{ title }}</p>
      <km-calculator :amount="amount" :currency="initialCurrency" />
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout";
import { onMounted, ref, watch } from "vue";

export default defineComponent({
  components: { BaseLayout },
  setup() {
    const route = useRoute();
    const currencies = {
      USD: "Dólares",
      PEN: "PEN",
    };

    const slug = route.params.slug;

    const amount = slug.replace(/[^0-9]+/g, "");

    const posPen = slug.search("soles");
    const posUsd = slug.search("dolares");

    const initialCurrency = posPen < posUsd ? "PEN" : "USD";

    const title = `¿Cuánto es ${amount} ${
      initialCurrency === "PEN" ? "Soles" : "Dólares"
    } en ${initialCurrency === "PEN" ? "Dólares" : "Soles"}?`;

    return {
      title,
      amount,
      initialCurrency,
    };
  },
});
</script>
