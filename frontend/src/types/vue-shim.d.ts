import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    // type definitions for global plugins
  }
}

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare global {
  interface Window {}
}
