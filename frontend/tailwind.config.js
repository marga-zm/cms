const plugin = require("tailwindcss/plugin");

module.exports = {
  enabled: process.env.NODE_ENV === "production",
  content: [
    "./src/shared/**/*.{vue,js,ts}",
    "./src/layouts/**/*.{vue,js,ts}",
    "./src/pages/**/*.{vue,js,ts}",
    "./src/components/**/*.{vue,js,ts}",
    "./src/modules/**/*.{vue,js,ts}",
    "./src/plugins/**/*.ts",
    "./node_modules/@kambista/ui/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lighter: "#dee7ef",
        },
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5,
      },
      boxShadow: {
        xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: () => ({
        "blue-gradient":
          "linear-gradient(20.06deg, #182233 26.91%, #1D2744 45.75%, #293571 83.1%, #344197 110.93%);",
      }),
      animation: {
        wave: "ping 1.75s cubic-bezier(0, 0, 0.2, 1) infinite",
        "wave-shadow": "ping 1.75s cubic-bezier(0, 0, 0.2, 1) 0.75s infinite",
      },
    },
  },
  variants: {
    zIndex: ["responsive", "hover"],
    position: ["responsive", "hover"],
    padding: ["responsive", "last"],
    margin: ["responsive", "last"],
    borderWidth: ["responsive", "last"],
    backgroundColor: [
      "last",
      "first",
      "odd",
      "responsive",
      "hover",
      "dark",
      "dark-hover",
      "checked",
    ],
    borderColor: [
      "last",
      "first",
      "odd",
      "responsive",
      "hover",
      "dark",
      "dark-hover",
      "checked",
    ],
    textColor: [
      "last",
      "first",
      "odd",
      "responsive",
      "hover",
      "focus",
      "dark",
      "dark-hover",
    ],
    opacity: ["disabled"],
    cursor: ["disabled"],
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("dark", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark .${e(`dark${separator}${className}`)}`;
        });
      });
      addVariant("dark-hover", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark .${e(
            `dark${separator}hover${separator}${className}`,
          )}:hover`;
        });
      });
    }),
  ],
};
