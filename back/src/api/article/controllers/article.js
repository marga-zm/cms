// @ts-nocheck
"use strict";

/**
 * article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;

    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const article = await strapi.entityService.findMany(
      "api::article.article",
      query,
      { populate: ["relatedArticles"] }
    );

    return this.transformResponse(article[0]);
  },
}));
