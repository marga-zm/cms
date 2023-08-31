/* eslint-disable no-undef */
export default class CustomerService {
  getArticles = async () => {
    let endpoint = `/articles?populate=*`;
    return await useFetchAPI(endpoint);
  };

  getArticleById = async (id) => {
    let endpoint = `/articles/${id}`;
    return await useFetchAPI(endpoint);
  };

  filterArticleBySlug = async (slug) => {
    let endpoint = `/article/${slug}?populate=deep`;
    return await useFetchAPI(endpoint);
  };

  getHomePage = async () => {
    let endpoint = `/home-page?populate=deep`;
    return await useFetchAPI(endpoint);
  };

  getBlogPage = async () => {
    let endpoint = `/blog-page?populate=deep`;
    return await useFetchAPI(endpoint);
  };
}
