import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
  shallowEqual,
} from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "@/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Memoized selectors untuk auth state
const selectAuthState = (state: RootState) => state.auth;

const selectAuth = createSelector([selectAuthState], (authState: any) => ({
  user: authState.user,
  token: authState.token,
  isAuthenticated: authState.isAuthenticated,
  isLoading: authState.isLoading,
  error: authState.error,
}));

// Individual selectors untuk granular performance
const selectUser = createSelector(
  [selectAuthState],
  (authState: any) => authState.user
);
const selectToken = createSelector(
  [selectAuthState],
  (authState: any) => authState.token
);
const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (authState: any) => authState.isAuthenticated
);
const selectIsLoading = createSelector(
  [selectAuthState],
  (authState: any) => authState.isLoading
);
const selectError = createSelector(
  [selectAuthState],
  (authState: any) => authState.error
);

// Composite selectors for common combinations
const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectIsLoading],
  (isAuthenticated, isLoading) => ({ isAuthenticated, isLoading })
);

const selectUserProfile = createSelector(
  [selectUser, selectIsAuthenticated],
  (user, isAuthenticated) => ({ user, isAuthenticated })
);

// Helper hooks untuk auth state dengan proper memoization
export const useAuthSelector = () => useSelector(selectAuth, shallowEqual);
export const useUser = () => useSelector(selectUser);
export const useToken = () => useSelector(selectToken);
export const useIsAuthenticated = () => useSelector(selectIsAuthenticated);
export const useIsLoading = () => useSelector(selectIsLoading);
export const useAuthError = () => useSelector(selectError);

// Composite hooks untuk common use cases
export const useAuthStatus = () => useSelector(selectAuthStatus, shallowEqual);
export const useUserProfile = () =>
  useSelector(selectUserProfile, shallowEqual);
