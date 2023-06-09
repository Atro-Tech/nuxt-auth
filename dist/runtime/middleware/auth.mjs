import { navigateTo, defineNuxtRouteMiddleware, useRuntimeConfig } from "#app";
import useAuth from "../composables/useAuth.mjs";
import { determineCallbackUrl } from "../utils/url.mjs";
export default defineNuxtRouteMiddleware((to) => {
  const metaAuth = to.meta.auth;
  if (metaAuth === false) {
    return;
  }
  const authConfig = useRuntimeConfig().public.auth;
  const { status, signIn } = useAuth();
  const isGuestMode = typeof metaAuth === "object" && metaAuth.unauthenticatedOnly;
  if (isGuestMode && status.value === "unauthenticated") {
    return;
  }
  if (typeof metaAuth === "object" && !metaAuth.unauthenticatedOnly) {
    return;
  }
  if (status.value === "authenticated") {
    if (isGuestMode) {
      return navigateTo(metaAuth.navigateAuthenticatedTo ?? "/");
    }
    return;
  }
  if (authConfig.globalMiddlewareOptions.allow404WithoutAuth) {
    const matchedRoute = to.matched.length > 0;
    if (!matchedRoute) {
      return;
    }
  }
  const signInOptions = { error: "SessionRequired", callbackUrl: determineCallbackUrl(authConfig, () => to.path) };
  return signIn(void 0, signInOptions);
});
