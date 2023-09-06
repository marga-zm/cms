declare const cachedEventHandler: Function;
interface Article {
  id: string;
  attributes: {
    title: string;
    created: string;
    slug: string;
    tag: string;
  };
}
const getInitialDataBlog = async () => {
  try {
    const response = await fetch(
      "https://kambista.onrender.com/api/articles?populate=*",
    );
    if (!response.ok) {
      throw new Error("Error");
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return "blog";
  }
};

export default cachedEventHandler(
  async () => {
    const usd = [...new Array(10)].map((_, idx) => ({
      loc: `conversor/cuanto-es-${idx + 1}-${
        idx == 0 ? "dolar" : "dolares"
      }-en-soles`,
    }));

    const pen = [...new Array(10)].map((_, idx) => ({
      loc: `conversor/cuanto-es-${(idx + 1) * 5}-soles-en-dolares`,
    }));

    const articles = await getInitialDataBlog();
    console.log(articles);

    const blogTags = articles.map((article: Article) => ({
      loc: `${article.attributes.tag.toLowerCase()}`,
    }));

    const blogArticles = articles.map((article: Article) => ({
      loc: `${article.attributes.tag.toLowerCase()}/${article.attributes.slug}`,
    }));

    return [usd, pen, blogTags, blogArticles].flat();
  },
  {
    name: "sitemap-dynamic-url",
    maxAge: 60 * 10, // cache URLs for 10 minutes
  },
);
