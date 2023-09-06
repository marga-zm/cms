<script>
export default defineComponent({
  props: {
    seo: { type: Object, default: () => {} },
  },
  data() {
    return {
      breadcrumbs: [
        {
          url: "https://kambista.com/",
          text: "home",
        },
        {
          url: this.seo.canonicalURL,
          text: this.seo.title,
        },
      ],
    };
  },
  jsonld() {
    const items = this.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.url,
        name: item.text,
      },
    }));
    const questions = this.seo?.structuredData.questions?.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }));
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `${this.seo.canonicalURL}#article`,
          isPartOf: {
            "@id": this.seo.canonicalURL,
          },
          headline: this.seo.title,
          datePublished: this.seo.createdAt,
          dateModified: this.seo.updatedAt,
          mainEntityOfPage: {
            "@id": this.seo.canonicalURL,
          },
        },
        { "@type": "BreadcrumbList", itemListElement: items },
        {
          "@type": "FAQPage",
          mainEntity: questions,
        },
      ],
    };
  },
});
</script>
