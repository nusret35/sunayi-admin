// utils/auth.ts

import { hydrateAuth, setIsLoggedIn } from "@/redux/slices/authSlice";
import { store } from "@/redux/store/store";

export const AUTH_STORAGE_KEY = "isLoggedIn";

// Save auth state to localStorage
export const saveAuthState = (isLoggedIn: boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isLoggedIn));
  }
};

// Load auth state from localStorage
export const loadAuthState = (): boolean => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  }
  return false;
};

// Hydrate auth state on app initialization
export const hydrateAuthState = () => {
  const isLoggedIn = loadAuthState();
  store.dispatch(hydrateAuth(isLoggedIn));
};

// Login function
export const login = () => {
  store.dispatch(setIsLoggedIn(true));
  saveAuthState(true);
};

// Logout function
export const logout = () => {
  store.dispatch(setIsLoggedIn(false));
  saveAuthState(false);
};
