type MiddlewareMeta = boolean | {
    unauthenticatedOnly: true;
    navigateAuthenticatedTo?: string;
};
declare module '#app/../pages/runtime/composables' {
    interface PageMeta {
        auth?: MiddlewareMeta;
    }
}
declare const _default: any;
export default _default;
