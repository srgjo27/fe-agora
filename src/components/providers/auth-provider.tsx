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
    dispatch(initializeAuth());
  }, [dispatch, token]);

  return <>{children}</>;
};
