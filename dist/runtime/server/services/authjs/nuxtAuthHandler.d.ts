import type { H3Event } from 'h3';
import type { GetTokenParams } from 'next-auth/jwt';
/** Setup the nuxt (next) auth event handler, based on the passed in options */
export declare const NuxtAuthHandler: (nuxtAuthOptions?: any) => import("h3").EventHandler<any>;
export declare const getServerSession: (event: H3Event) => Promise<any>;
/**
 * Get the decoded JWT token either from cookies or header (both are attempted).
 *
 * The only change from the original `getToken` implementation is that the `req` is not passed in, in favor of `event` being passed in. See https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken for further documentation.
 *
 * @param eventAndOptions Omit<GetTokenParams, 'req'> & { event: H3Event } The event to get the cookie or authorization header from that contains the JWT Token and options you want to alter token getting behavior.
 */
export declare const getToken: ({ event, secureCookie, secret, ...rest }: Omit<GetTokenParams, "req"> & {
    event: H3Event;
}) => any;
