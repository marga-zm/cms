//@ts-nocheck
import { NUXT_ENV_API_URL } from "./environments";
import {
  storage,
  PRODUCTION_ENVIRONMENT,
  QA_ENVIRONMENT,
  Cookies,
} from "@kambista/ui/core";

export const httpConfiguration = ($axios: any) => {
  const api = $axios.create({
    method: "get",
    headers: {
      "content-type": "application/json; charset=utf-8",
      Authorization: Cookies.get("Auth") || "",
      "k-device":
        storage.get("k-device") ||
        storage.get("device").kdevice ||
        "023de6ec-1077-4fd8-853e-70e515ca8310",
    },
    timeout: 40000,
    withCredentials: false,
    responseType: "json",
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: 2000000,
    maxRedirects: 3,
  });
  if (typeof api.setBaseURL !== "undefined") {
    api.setBaseURL(NUXT_ENV_API_URL);
  }
  if (typeof api.onError !== "undefined") {
    api.onError((error: any) => {
      const code = parseInt(error.response && error.response.status);
      if (code === 401 || code === 404) {
        storage.clear();
        if (PRODUCTION_ENVIRONMENT || QA_ENVIRONMENT) {
          Cookies.remove("Auth", { domain: "kambista.com" });
          Cookies.remove("userId", { domain: "kambista.com" });
        } else {
          Cookies.remove("Auth");
          Cookies.remove("userId");
        }
        if (
          process.client &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/login/"
        ) {
          window.location = `${location.protocol}//${location.host}/login`;
        }
      }
    });
  }
  return api;
};
