import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import toggleReducer from './toggleSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    toggle: toggleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
