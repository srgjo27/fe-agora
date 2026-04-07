export const ROUTES = {
  ROOT: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  COMMUNITY: {
    FORUM: "/forum",
    FORUM_DETAIL: (threadId: string) => `/forum/${threadId}`,
  },
  DASHBOARD: {
    HOME: "/dashboard",
  },
  ERROR: {
    404: "/404",
    500: "/500",
    UNAUTHORIZED: "/401",
    FORBIDDEN: "/403",
  },
} as const;
