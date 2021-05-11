import Cookie from "js-cookie";
import axios from "axios";

import { setAuthStatus, setCurrentUser, setUserId } from "redux/actions";
import { store } from "redux/store";
const { dispatch } = store;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

function setLogin(token: string, username: string, id: number) {
    Cookie.set("token", token);
    dispatch(setCurrentUser(username));
    dispatch(setUserId(id));
    dispatch(setAuthStatus("authenticated"));
}

function setLogout() {
    Cookie.remove("token");
    dispatch(setCurrentUser(null));
    dispatch(setUserId(null));
    dispatch(setAuthStatus("unauthenticated"));
}

export const registerUser = async (username: string, email: string, password: string) => {
    const body = { username, email, password };
    try {
        const res = await axios.post(`${API_URL}/auth/local/register`, body);
        const { jwt, user } = res.data;
        setLogin(jwt, user.username, user.id);
        return res;
    } catch (error) {
        setLogout();
        throw error;
    }
};

export const login = async (identifier: string, password: string) => {
    const body = { identifier, password };
    try {
        const res = await axios.post(`${API_URL}/auth/local/`, body);
        const { jwt, user } = res.data;
        setLogin(jwt, user.username, user.id);
        return res;
    } catch (error) {
        setLogout();
        throw error;
    }
};

export async function autheticateWithToken(token: string | undefined) {
    if (!token) {
        dispatch(setUserId(null));
        dispatch(setAuthStatus("unauthenticated"));
        return;
    }

    dispatch(setAuthStatus("autheticating"));
    const headers = { Authorization: `Bearer ${token}` };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, { headers });

    if (res.ok) {
        const { username, id } = await res.json();
        setLogin(token, username, id);
    } else {
        setLogout();
    }
}

// extend the global Window interface to include __user
declare global {
    interface Window {
        __user: unknown;
    }
}

export const logout = () => {
    Cookie.remove("token");
    delete window.__user;

    // sync logout between multiple windows
    window.localStorage.setItem("logout", Date.now().toString());
};
