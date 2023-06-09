import { addRouteMiddleware, defineNuxtPlugin, useRuntimeConfig } from "#app";
import authMiddleware from "./middleware/auth.mjs";
import { useAuth, useAuthState } from "#imports";
export default defineNuxtPlugin(async (nuxtApp) => {
  const { data, lastRefreshedAt } = useAuthState();
  const { getSession } = useAuth();
  if (typeof data.value === "undefined") {
    await getSession();
  }
  const { enableRefreshOnWindowFocus, enableRefreshPeriodically } = useRuntimeConfig().public.auth.session;
  const visibilityHandler = () => {
    if (enableRefreshOnWindowFocus && document.visibilityState === "visible") {
      getSession();
    }
  };
  let refetchIntervalTimer;
  nuxtApp.hook("app:mounted", () => {
    document.addEventListener("visibilitychange", visibilityHandler, false);
    if (enableRefreshPeriodically !== false) {
      const intervalTime = enableRefreshPeriodically === true ? 1e3 : enableRefreshPeriodically;
      refetchIntervalTimer = setInterval(() => {
        if (data.value) {
          getSession();
        }
      }, intervalTime);
    }
  });
  const _unmount = nuxtApp.vueApp.unmount;
  nuxtApp.vueApp.unmount = function() {
    document.removeEventListener("visibilitychange", visibilityHandler, false);
    clearInterval(refetchIntervalTimer);
    lastRefreshedAt.value = void 0;
    data.value = void 0;
    _unmount();
  };
  const { globalAppMiddleware } = useRuntimeConfig().public.auth;
  if (globalAppMiddleware.isEnabled) {
    addRouteMiddleware("auth", authMiddleware, {
      global: true
    });
  }
});
