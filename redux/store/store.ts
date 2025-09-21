import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "@/redux/slices/authSlice";
import { nonAuthApi } from "../services/nonAuthApi";
import { authApi } from "../services/authApi";

export const store = configureStore({
  reducer: {
    authSlice: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [nonAuthApi.reducerPath]: nonAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(nonAuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
