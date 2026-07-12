// src/utils/authServerHelpers.js
// This file acts as a stable wrapper to handle the Server Action calls
import { setAuthCookieAction, removeAuthCookieAction } from '@/lib/authActions'; 

/**
 * @description Safely calls the Server Action to set the cookie.
 * @param {string} token
 */
export function callSetAuthCookie(token) {
    // This is the function the Saga will yield call() on.
    // It cleanly wraps the potentially problematic Server Action import.
    return setAuthCookieAction(token);
}

/**
 * @description Safely calls the Server Action to remove the cookie.
 */
export function callRemoveAuthCookie() {
    return removeAuthCookieAction();
}