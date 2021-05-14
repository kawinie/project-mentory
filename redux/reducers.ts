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

const initialSearchQuery = "";
export const searchQuery = createReducer(initialSearchQuery, (builder) => {
    builder.addCase(actions.setSearchQuery, (currentState, action) => {
        const payload = action.payload;
        currentState = payload;
        return currentState;
    });
});

const initialCheckboxes: Record<string, [boolean, string]> = {};
export const filterCheckboxes = createReducer(initialCheckboxes, (builder) => {
    builder.addCase(actions.setCheckboxes, (currentState, action) => {
        const payload = action.payload;

        const categories = [
            "Business",
            "Video",
            "Music",
            "Programming",
            "Design",
            "Writing",
            "Makeup",
            "Lifestyle",
        ];

        const tags = [
            "Next.js",
            "Python",
            "C++",
            "Javascript",
            "Ruby",
            "PyTorch",
            "Tensorflow",
            "NLP",
            "Computer Vision",
        ];

        // update the state
        Object.keys(payload).forEach((k) => {
            if (categories.includes(k)) currentState[k] = [payload[k], "categories"];
            if (tags.includes(k)) currentState[k] = [payload[k], "tags"];
            if (k.startsWith("review-")) currentState[k] = [payload[k], "scores"];
        });

        return currentState;
    });
});
