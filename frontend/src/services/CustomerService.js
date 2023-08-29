/* eslint-disable no-undef */
import { NUXT_ENV_API_URL } from "../config/environments";
const baseURL = "http://localhost:1337/api";

export default class CustomerService {
  getArticles = async () => {
    let endpoint = `/articles?populate=*`;
    return await useFetch(endpoint, {
      baseURL,
    });
  };

  getArticleById = async (id) => {
    let endpoint = `/articles/${id}`;
    return await useFetch(endpoint, {
      baseURL,
    });
  };

  filterArticleBySlug = async (slug) => {
    let endpoint = `/article/${slug}?populate=deep`;
    return await useFetch(endpoint, {
      baseURL,
    });
  };

  getHomePage = async () => {
    let endpoint = `/home-page?populate=deep`;
    return await useFetch(endpoint, {
      baseURL,
    });
  };

  getBlogPage = async () => {
    let endpoint = `/blog-page?populate=deep`;
    return await useFetch(endpoint, {
      baseURL,
    });
  };
}
