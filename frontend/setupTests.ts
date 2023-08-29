import "@testing-library/jest-dom";
import server from "./mocks/http/server";
import path from "path";
import fs from "fs";
import Vue from "vue";
//import { loadHTTPServices } from "./src/core/infrastructure/loaders/loadHttpServices";
//import { httpConfiguration } from "./src/config/http";
import axios from "axios";

function buildGlobalComponents(directory: string) {
  const files = fs.readdirSync(path.join(__dirname, directory));
  files.forEach((componentName) => {
    const name = componentName.replace(".vue", "");
    const prefix = `./${directory}/`;
    const filePath = `${prefix}${componentName}`;
    Vue.component(name, require(filePath).default);
  });
}

Vue.use(() => {
  //Vue.prototype.$services = loadHTTPServices(httpConfiguration(axios));
});

buildGlobalComponents("node_modules/@kambista/ui/components");
buildGlobalComponents("node_modules/@kambista/ui/icons");

Vue.config.productionTip = false;

//@ts-ignore
global.Vue = Vue;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
