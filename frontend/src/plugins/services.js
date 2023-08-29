import CustomerService from "../services/CustomerService";

export default defineNuxtPlugin((nuxtApp) => {
  const services = {
    customer: new CustomerService(),
  };
  // return {
  //   provide: {
  //     services: services,
  //   },
  // };
  nuxtApp.provide("services", services);
});
