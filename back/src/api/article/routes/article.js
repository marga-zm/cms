"use strict";

/**
 * article router
 */

// module.exports = createCoreRouter("api::article.article");
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/articles",
      handler: "api::article.article.find",
    },
    {
      method: "GET",
      path: "/article/:slug",
      handler: "api::article.article.findBySlug",
    },
  ],
};
