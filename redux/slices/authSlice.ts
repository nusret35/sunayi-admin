"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface AuthState {
  isLoggedIn: boolean;
  isHydrated: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn(state: AuthState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    hydrateAuth(state: AuthState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
      state.isHydrated = true;
    },
  },
});

export const { setIsLoggedIn, hydrateAuth } = authSlice.actions;
export const useAuth = () => useSelector((state: RootState) => state.authSlice);
export default authSlice.reducer;
