// API endpoints constants
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },

  USERS: {
    ME: "/users/me",
  },

  CATEGORIES: "/categories",

  FORUM: {
    THREADS: "/threads",
    THREAD_DETAIL: (id: string) => `/threads/${id}`,
    THREAD_CREATE: `/threads`,
    THREAD_DELETE: (id: string) => `/threads/${id}`,
    THREAD_UPDATE: (id: string) => `/threads/${id}`,

    POSTS: (id: string) => `/threads/${id}/posts`,
    POST_CREATE: (id: string) => `/threads/${id}/posts`,

    VOTE_ON_THREAD: (id: string) => `/threads/${id}/vote`,
    VOTE_ON_POST: (id: string) => `/posts/${id}/vote`,
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied.",
  NOT_FOUND: "Resource not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Internal server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred.",
} as const;
