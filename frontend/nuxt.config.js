// https://nuxt.com/docs/api/configuration/nuxt-config
const path = require("path");

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "Kambista",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "noindex,nofollow" },
        { name: "theme-color", content: "#060F26" },
        {
          hid: "description",
          name: "description",
          content:
            "Kambista. Cambio de dólares online de forma rápida, justa y segura. Unete a Kambista.com y obten el mejor tipo de cambio desde tu comodidad",
        },
        { name: "autor", content: "Kambista" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://cdn.kambista.com/fonts/kambista-font.css",
        },
      ],
      script: [
        {
          src: "https://cdn.kambista.com/app/web-components/km-calculator/km-calculator.client.js",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      NUXT_ENV_API_URL: process.env.NUXT_ENV_API_URL,
      NUXT_ENV_STRAPI_URL: process.env.NUXT_ENV_STRAPI_URL,
    },
  },
  buildModules: ["./localeRoutes"],
  modules: ["@nuxtjs/tailwindcss", "nuxt-simple-sitemap"],
  srcDir: "./src",
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
          autoprefixer: {},
        },
      },
      preset: {
        stage: 1,
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          tailwindConfig: {
            test: /tailwind\.config/,
            chunks: "all",
            priority: 10,
            name: true,
          },
        },
      },
    },
  },
});
