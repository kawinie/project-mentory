import Cookie from "js-cookie";
import axios from "axios";

import { setAuthStatus } from "redux/actions";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// register a new user
export const registerUser = (username: string, email: string, password: string) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL}/auth/local/register`, { username, email, password })
            .then((res) => {
                // set token response from Strapi for server validation
                Cookie.set("token", res.data.jwt);

                // resolve the promise to set loading to false
                resolve(res);
            })
            .catch((error) => {
                // reject the promise and pass the error object back to the form
                reject(error);
            });
    });
};

// login an existing user
export const login = (identifier: string, password: string) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${API_URL}/auth/local/`, { identifier, password })
            .then((res) => {
                // set token response from Strapi for server validation
                Cookie.set("token", res.data.jwt);

                // resolve the promise to set loading to false
                resolve(res);
                setAuthStatus("authenticated");
            })
            .catch((error) => {
                //reject the promise and pass the error object back to the form
                reject(error);
            });
    });
};

// extend the global Window interface to include __user
declare global {
    interface Window {
        __user: unknown;
    }
}

// logout a logged-in user
export const logout = () => {
    // remove token and user cookie
    Cookie.remove("token");
    delete window.__user;

    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now().toString());
};
