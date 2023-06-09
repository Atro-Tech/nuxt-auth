import type { ComputedRef, Ref } from 'vue';
import type { Session } from 'next-auth';
export type SessionStatus = 'authenticated' | 'unauthenticated' | 'loading';
export type SessionLastRefreshedAt = Date | undefined;
export type SessionData = Session | undefined | null;
export interface useAuthStateReturn {
    data: Ref<SessionData>;
    loading: Ref<boolean>;
    lastRefreshedAt: Ref<SessionLastRefreshedAt>;
    status: ComputedRef<SessionStatus>;
}
declare const _default: () => useAuthStateReturn;
export default _default;
