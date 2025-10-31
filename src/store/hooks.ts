import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Helper hook untuk auth state dengan proper typing
export const useAuthSelector = () => {
  return useSelector((state: RootState) => {
    const authState = state.auth as any; // Type assertion untuk mengatasi PersistPartial
    return {
      user: authState.user,
      token: authState.token,
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      error: authState.error,
    };
  });
};