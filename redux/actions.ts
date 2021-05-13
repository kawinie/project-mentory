import { createAction } from "@reduxjs/toolkit";

import { AuthStatus } from "redux/models";

// ────────────────────────────────────────────────────── II ──────────
//   :::::: A C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

function withPayload<K extends unknown[], V>(action: (...args: K) => V) {
    return (...args: K) => ({ payload: action(...args) });
}

export const setUsername = createAction(
    "username/set",
    withPayload((username: string | null) => username)
);

export const setUserId = createAction(
    "userId/set",
    withPayload((id: number | null) => id)
);

export const setAuthStatus = createAction(
    "auth/set",
    withPayload((status: AuthStatus) => status)
);
