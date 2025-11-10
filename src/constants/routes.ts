// Routes constants untuk navigation

export const ROUTES = {
  // Public Routes
  ROOT: "/",

  // Authentication
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },

  // Community
  COMMUNITY: {
    FORUM: "/forum",
    FORUM_DETAIL: (threadId: string) => `/forum/${threadId}`,
  },

  // Dashboard/Admin
  DASHBOARD: {
    HOME: "/dashboard",
  },

  // Error Pages
  ERROR: {
    404: "/404",
    500: "/500",
    UNAUTHORIZED: "/401",
    FORBIDDEN: "/403",
  },
} as const;

// Navigation Menu Items
export const NAVIGATION_MENU = {
  // MAIN: [{ label: "Home", href: ROUTES.HOME }],

  FOOTER: [
    {
      title: "Lorem",
      items: [],
    },
    {
      title: "Lorem",
      items: [],
    },
    {
      title: "Lorem",
      items: [
        // { label: "", href: "/" },
      ],
    },
    {
      title: "Lorem",
      items: [],
    },
  ],

  DASHBOARD_SIDEBAR: [
    {
      label: "Dashboard",
      href: ROUTES.DASHBOARD.HOME,
      icon: "dashboard",
    },
    // {
    //   label: 'Settings',
    //   href: ROUTES.DASHBOARD.SETTINGS.GENERAL,
    //   icon: 'settings',
    //   children: [
    //     { label: 'General', href: ROUTES.DASHBOARD.SETTINGS.GENERAL },
    //     { label: 'Notifications', href: ROUTES.DASHBOARD.SETTINGS.NOTIFICATIONS }
    //   ]
    // }
  ],

  ACCOUNT_SIDEBAR: [
    {
      label: "Profile",
      // href: ROUTES.ACCOUNT.PROFILE,
      icon: "user",
    },
  ],
} as const;

// Breadcrumb configurations
export const BREADCRUMBS = {
  // [ROUTES.PRODUCTS]: [
  //   { label: 'Home', href: ROUTES.HOME },
  //   { label: 'Products', href: ROUTES.PRODUCTS }
  // ],
  // [ROUTES.CART]: [
  //   { label: 'Home', href: ROUTES.HOME },
  //   { label: 'Shopping Cart', href: ROUTES.CART }
  // ],
  // [ROUTES.CHECKOUT]: [
  //   { label: 'Home', href: ROUTES.HOME },
  //   { label: 'Cart', href: ROUTES.CART },
  //   { label: 'Checkout', href: ROUTES.CHECKOUT }
  // ]
} as const;
