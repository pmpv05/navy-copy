//Class for token management. Three straightforward methods. Get, Set and Delete of Token.
const TOKEN_KEY = 'token';

export function getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(value) {
    window.localStorage.setItem(TOKEN_KEY, value);
}

export function removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
}