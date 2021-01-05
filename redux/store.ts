import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import {} from "redux/actions";
// import * as reducers from "redux/reducers";

const logger: Middleware = (_) => (next) => (action) => {
    next(action);
};

// const rootReducer = combineReducers(reducers);
const rootReducer = () => ({});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;
