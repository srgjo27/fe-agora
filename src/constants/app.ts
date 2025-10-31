// Application configuration constants

// App Information
export const APP_CONFIG = {
  NAME: 'Agora',
  VERSION: '1.0.0',
  DESCRIPTION: '',
  AUTHOR: 'srgjo27',
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
} as const

// Environment
export const ENVIRONMENT = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test'
} as const

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 10,
  MAX_PER_PAGE: 100,
  PER_PAGE_OPTIONS: [10, 20, 50, 100]
} as const

// File Upload
export const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/msword'],
  MAX_FILES: 10
} as const

// Date Formats
export const DATE_FORMATS = {
  DEFAULT: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY',
  FULL: 'MMMM DD, YYYY HH:mm:ss',
  TIME: 'HH:mm:ss',
  ISO: 'YYYY-MM-DDTHH:mm:ss.sssZ'
} as const

// Currency
export const CURRENCY = {
  DEFAULT: 'USD',
  SYMBOL: '$',
  PRECISION: 2,
  SUPPORTED: ['USD', 'EUR', 'GBP', 'JPY', 'IDR']
} as const

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
} as const

// Theme
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const

// Z-Index Layers
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  OFFCANVAS: 1050,
  MODAL: 1060,
  POPOVER: 1070,
  TOOLTIP: 1080
} as const

// Animation Durations (in milliseconds)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
} as const

// Debounce Delays (in milliseconds)
export const DEBOUNCE = {
  SEARCH: 300,
  TYPING: 500,
  SCROLL: 100,
  RESIZE: 250
} as const

// Social Media Links
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/agora',
  FACEBOOK: 'https://facebook.com/agora',
  INSTAGRAM: 'https://instagram.com/agora',
  LINKEDIN: 'https://linkedin.com/company/agora',
  GITHUB: 'https://github.com/agora'
} as const

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'info@agora.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Commerce Street, Business City, BC 12345',
  SUPPORT_EMAIL: 'support@agora.com',
} as const

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: true,
  ENABLE_MULTI_LANGUAGE: false,
  ENABLE_PWA: false,
  ENABLE_OFFLINE_MODE: false
} as const