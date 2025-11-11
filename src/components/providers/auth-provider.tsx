"use client";

import { useEffect } from "react";
import { useAppDispatch, initializeAuth, useAuthSelector } from "@/store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();
  const { token } = useAuthSelector();

  useEffect(() => {
    // Delay sedikit untuk memastikan persist sudah selesai rehydrate
    const timer = setTimeout(() => {
      dispatch(initializeAuth());
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch, token]);

  return <>{children}</>;
};
