import favicon from "./extensions/favicon.png";

const config = {
  locales: ["es"],
  head: {
    favicon: favicon,
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
