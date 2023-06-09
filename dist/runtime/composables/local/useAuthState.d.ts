import { ComputedRef } from 'vue';
import { CookieRef } from '#app';
import { CommonUseAuthStateReturn } from '../../types';
import type { SessionData } from '#auth';
interface UseAuthStateReturn extends CommonUseAuthStateReturn<SessionData> {
    token: ComputedRef<string | null>;
    rawToken: CookieRef<string | null>;
}
export declare const useAuthState: () => UseAuthStateReturn;
export default useAuthState;
