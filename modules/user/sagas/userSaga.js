import { call, put, takeLatest, all } from 'redux-saga/effects';
import { UserService } from '@/modules/user/services/UserService';
import { UserAPIRepository } from '../repositories/UserAPIRepository';
import { 
    loginRequest, 
    loginSuccess, 
    loginFailure, 
    logout, 
    otpRequest, 
    otpRequestSuccess, 
    otpRequestFailure,
    logoutSuccess,
    logoutRequest,
    authCheckedFinished
} from '@/modules/user/state/userSlice';

// Secure Server Actions
import { 
    removeAuthCookieAction, 
    setAuthCookieAction, 
    getAuthTokenAction 
} from '@/lib/authActions';

// --- WORKERS ---

function* initialAuthCheckWorker() {
    const userService = new UserService();
    try {
        // 1. Get token from secure cookie
        const token = yield call(getAuthTokenAction);

        if (token) {
            // 2. Bind context [userService, method] to prevent 'this' issues
            const { user, newToken } = yield call([userService, userService.verifyToken], token);

            yield put(loginSuccess({ user, token: newToken || token }));
            console.log("Session restored successfully.");
        } else {
            yield put(logout());
            console.log("No active session found.");
        }
    } catch (error) {
        yield put(logout());
        console.error("Session check failed:", error.message);
    }finally{
        console.log("token failed");
        yield put(authCheckedFinished());
    }
}

function* loginWorker(action) {
    const userService = new UserService();
    try {
        // Validation and API call through Service
        const { user, token } = yield call(userService.login, action.payload);
        
        // Securely set the cookie
        yield call(setAuthCookieAction, token); 
        yield put(loginSuccess({ user, token }));
    } catch (error) {
        yield put(loginFailure(error.message));
    }
}

function* otpRequestWorker(action) {
    const userService = new UserService();
    try {
        const { phone } = action.payload;
        yield call([userService, userService.requestOtp], phone);
        yield put(otpRequestSuccess({ phone }));
    } catch (error) {
        yield put(otpRequestFailure(error.message));
    }
}

function* otpVerifyWorker(action) {
    const userService = new UserService();
    try {
        const { otp_id, otp } = action.payload;
        const { user, token } = yield call([userService, userService.verifyOtp], otp_id, otp);
        
        yield call(setAuthCookieAction, token); 
        yield put(loginSuccess({ user, token })); 
    } catch (error) {
        yield put(loginFailure(error.message));
    }
}

function* logoutWorker() {
    try {
        yield call(removeAuthCookieAction);
        yield put(logoutSuccess());
    } catch (error) {
        console.error("Logout error:", error);
    }
}





// --- WATCHER (Listens for specific actions) ---
export function* userWatcher() {
    yield takeLatest(loginRequest.type, loginWorker);
    yield takeLatest(otpRequest.type, otpRequestWorker);
    yield takeLatest('user/otpVerify', otpVerifyWorker); 
    yield takeLatest(logoutRequest.type, logoutWorker);
}

// --- ROOT USER SAGA (Exported to global rootSaga) ---
/**
 * @description The entry point for the User module's side effects.
 * Combines initialization logic and interaction watchers.
 */
export default function* userRootSaga() {
    yield all([
        initialAuthCheckWorker(), // Runs immediately once on app load
        userWatcher(),            // Starts background listeners
    ]);
}   