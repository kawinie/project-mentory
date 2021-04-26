import { createReducer } from "@reduxjs/toolkit";

import * as actions from "redux/actions";

import { AuthStatus } from "./models";

//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: H E L P E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

function ifElse<B extends boolean, T, K>(c: B, a: T, b: K) {
    return c ? a : b;
}

//
// ──────────────────────────────────────────────────────── II ──────────
//   :::::: R E D U C E R S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//

const initialUsername = null;
export const currentUsername = createReducer<string | null>(initialUsername, (builder) => {
    builder.addCase(actions.setCurrentUser, (_, action) => action.payload);
});

export const authStatus = createReducer<AuthStatus>("ready", (builder) => {
    builder.addCase(actions.setAuthStatus, (_, action) => action.payload);
});
