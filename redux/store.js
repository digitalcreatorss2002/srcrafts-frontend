import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

// 1. Define environmental check
const isClient = typeof window !== 'undefined';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ 
            thunk: false, 
            serializableCheck: false // Note: Fixed typo 'serializableCkeck'
        }).concat(sagaMiddleware),
});

// 2. Conditional Execution (Production-Grade Fix)
/**
 * We only run the Saga middleware if we are on the client.
 * This prevents 'next build' from executing side-effects during 
 * the static generation of the /_not-found page.
 */
if (isClient) {
    sagaMiddleware.run(rootSaga);
}