import { createAction } from "@reduxjs/toolkit";
import {} from "redux/models";

// ────────────────────────────────────────────────────── II ──────────
//   :::::: A C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

export const createSession = createAction("CREATE_SESSION", function (text: string) {
    return { payload: { text } };
});
