import { joinURL } from "ufo";
import _getURL from "requrl";
import { sendRedirect } from "h3";
import { useRequestEvent, useNuxtApp } from "#app";
import { useRuntimeConfig } from "#imports";
const getApiURL = () => {
  const origin = useRuntimeConfig().public.auth.origin ?? (process.env.NODE_ENV !== "production" ? getRequestURL(false) : "");
  return joinURL(origin, useRuntimeConfig().public.auth.basePath);
};
export const getRequestURL = (includePath = true) => _getURL(useRequestEvent()?.node.req, includePath);
export const joinPathToApiURL = (path) => joinURL(getApiURL(), path);
export const navigateToAuthPages = (href) => {
  const nuxtApp = useNuxtApp();
  if (process.server) {
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, href, 302));
    }
  }
  window.location.href = href;
  if (href.includes("#")) {
    window.location.reload();
  }
  const router = nuxtApp.$router;
  const waitForNavigationWithFallbackToRouter = new Promise((resolve) => setTimeout(resolve, 60 * 1e3)).then(() => router.push(href));
  return waitForNavigationWithFallbackToRouter;
};
export const determineCallbackUrl = (authConfig, getOriginalTargetPath) => {
  const authConfigCallbackUrl = authConfig.globalMiddlewareOptions?.addDefaultCallbackUrl;
  if (typeof authConfigCallbackUrl !== "undefined") {
    if (typeof authConfigCallbackUrl === "string") {
      return authConfigCallbackUrl;
    }
    if (typeof authConfigCallbackUrl === "boolean") {
      if (authConfigCallbackUrl) {
        return getOriginalTargetPath();
      }
    }
  }
};
