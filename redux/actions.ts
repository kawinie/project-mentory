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

export const setTransctionDetails = createAction(
    "transaction/set",
    withPayload((mentor: string, user: number, meeting: any[]) => ({
        mentor,
        user,
        meeting,
    }))
);

export const setCheckboxes = createAction(
    "filter/checkboxes/set",
    withPayload((object: Record<string, boolean>) => object)
);

export const setSearchQuery = createAction(
    "search/set",
    withPayload((object: string) => object)
);
