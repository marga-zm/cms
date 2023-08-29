/* eslint-disable no-undef */
import kambistaTypes from "../constants/kambista.types";
import { Cookies, NODE_ENV, storage } from "@kambista/ui/core";

export default class Kambista {
  constructor($context) {
    this.device = $context.$device;
    this.services = $context.$services;
    this.redirectval = $context.redirect;
  }
  redirect = (path = null) => {
    if (NODE_ENV === "production") {
      if (process.client) {
        window.location = `${location.protocol}//${location.host}/${path}/`;
      }
    } else {
      return;
    }
  };

  existsUser = () => {
    const vuex = storage.get("vuex") && storage.get("vuex")?.customer?.email;
    return Cookies.get("Auth") && vuex;
  };

  isAuth = () => {
    if (this.existsUser() || Cookies.get("webView")) {
      return true;
    } else {
      this.redirectval("/login");
    }
  };
  getDevice = () => {
    let device = this.device.isDesktop
      ? kambistaTypes.DEVICES[0]
      : this.device.isTablet
      ? kambistaTypes.DEVICES[1]
      : kambistaTypes.DEVICES[2];
    device.userAgent = this.device.userAgent;
    device.isWindows = this.device.isWindows;
    device.isMacOS = this.device.isMacOS;
    device.isAndroid = this.device.isAndroid;
    device.isIos = this.device.isIos;
    return device;
  };
}
