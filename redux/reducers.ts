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
    builder.addCase(actions.setUsername, (_, action) => action.payload);
});

export const currentUserId = createReducer<number | null>(null, (builder) => {
    builder.addCase(actions.setUserId, (_, action) => action.payload);
});

export const authStatus = createReducer<AuthStatus>("ready", (builder) => {
    builder.addCase(actions.setAuthStatus, (_, action) => action.payload);
});

type TransactionDetails = {
    mentor: string;
    user: number;
    meeting: any[];
};

export const currentTransaction = createReducer<TransactionDetails | null>(null, (builder) => {
    builder.addCase(actions.setTransctionDetails, (_, action) => action.payload);
});

const initialCheckboxes: Record<string, boolean> = {};
export const filterCheckboxes = createReducer(initialCheckboxes, (builder) => {
    builder.addCase(actions.setCheckboxes, (currentState, action) => {
        const payload = action.payload;

        Object.keys(payload).forEach((k) => {
            currentState[k] = payload[k];
        });

        return currentState;
    });
});
