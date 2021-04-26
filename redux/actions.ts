import { createAction } from "@reduxjs/toolkit";

import { AuthStatus } from "redux/models";

// ────────────────────────────────────────────────────── II ──────────
//   :::::: A C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

function withPayload<K extends unknown[], V>(action: (...args: K) => V) {
    return (...args: K) => ({ payload: action(...args) });
}

export const setCurrentUser = createAction(
    "user/set",
    withPayload((username: string | null) => username)
);

export const setAuthStatus = createAction(
    "auth/set",
    withPayload((status: AuthStatus) => status)
);
