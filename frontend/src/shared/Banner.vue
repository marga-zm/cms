<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="banner"
      class="fixed min-w-[250px] z-[60]"
      :class="[
        getVariantStyles,
        getCustomStyles,
        getWidthStyles,
        getRoundedStyles,
      ]"
      role="dialog"
    >
      <template v-if="custom">
        <slot name="header" />
        <slot name="content" />
      </template>

      <template v-else>
        <div class="flex justify-between z-[60]" @click="close">
          <TextParagraph alignment="center" weight="bold" :text="title" />
          x
        </div>
        <slot name="content" class="my-2" />
      </template>
    </div>
  </Teleport>
</template>

<script setup>
import { defineComponent, ref, onMounted, computed } from "vue";

// model: {
//   prop: "open",
//   event: "input",
// }
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: "" },
  /**
   * @options ['secondary','white']
   */
  variant: { type: String, default: "" },
  top: { type: String, default: "" },
  right: { type: String, default: "" },
  bottom: { type: String, default: "" },
  left: { type: String, default: "" },
  custom: { type: Boolean, default: false },
  /**
   * @options ['small', 'medium','large']
   */
  rounded: { type: String, default: "large" },
  fullWidth: { type: Boolean, default: false },
  /**
   * @options ['top', 'bottom','left', 'right']
   */
  animation: { type: String, default: "top" },
});
const banner = ref(null);

const close = () => {
  emit("close", false);
};

const handleEnter = (bannerElement) => {
  const transformAnimation = {
    top: "translateY(-100%)",
    bottom: "translateY(100%)",
    left: "translateX(-100%)",
    right: "translateX(100%)",
  }[props.animation];

  if (bannerElement) {
    if (
      props.top === "" &&
      props.left === "" &&
      props.right === "" &&
      props.left === ""
    ) {
      bannerElement.style.top = "0px";
      bannerElement.style.left = "0px";
      return;
    }

    bannerElement.style.top = props.top;
    bannerElement.style.left = props.left;
    bannerElement.style.right = props.right;
    bannerElement.style.bottom = props.bottom;

    bannerElement.animate(
      [{ transform: transformAnimation }, { transform: "none" }],
      {
        duration: 1000,
      },
    );
  }
};

onMounted(() => {
  handleEnter(banner.value);
});

watch(props.open, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});

const getVariantStyles = computed(() => {
  return {
    secondary: "bg-secondary text-white",
    white: "bg-white text-secondary",
  }[props.variant];
});
const getRoundedStyles = computed(() => {
  return {
    small: "rounded-b-md lg:rounded-md",
    medium: "rounded-b-xl lg:rounded-xl",
    large: "rounded-b-3xl lg:rounded-3xl",
  }[props.rounded];
});
const getCustomStyles = computed(() => {
  return props.custom ? "" : "p-2 px-4";
});
const getWidthStyles = computed(() => {
  return props.fullWidth ? "w-full" : "w-[16%]";
});
</script>
