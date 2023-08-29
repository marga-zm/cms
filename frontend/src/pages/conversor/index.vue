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
    const amount = 1000;
    const initialCurrency = "USD";

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
