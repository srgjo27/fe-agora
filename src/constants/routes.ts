// Routes constants untuk navigation

export const ROUTES = {
  // Public Routes
  HOME: '/',
  
  // Authentication
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },

  // User Account
  ACCOUNT: {
    PROFILE: '/account/profile',
    // ORDER_DETAIL: (id: string) => `/account/orders/${id}`,
  },

  // Dashboard/Admin
  DASHBOARD: {
    HOME: '/dashboard',
    
    // Settings
    SETTINGS: {
      GENERAL: '/dashboard/settings/general',
      NOTIFICATIONS: '/dashboard/settings/notifications'
    }
  },

  // Legal Pages
  LEGAL: {
    PRIVACY: '/privacy',
    TERMS: '/terms',
    COOKIES: '/cookies',
    REFUND: '/refund-policy'
  },

  // Support
  SUPPORT: {
    HELP: '/help',
    FAQ: '/faq',
    CONTACT: '/support/contact',
    TICKETS: '/support/tickets',
    TICKET_DETAIL: (id: string) => `/support/tickets/${id}`
  },

  // Error Pages
  ERROR: {
    404: '/404',
    500: '/500',
    UNAUTHORIZED: '/401',
    FORBIDDEN: '/403'
  }
} as const

// Navigation Menu Items
export const NAVIGATION_MENU = {
  MAIN: [
    { label: 'Home', href: ROUTES.HOME },
  ],
  
  FOOTER: [
    {
      title: 'Shop',
      items: [
        { label: 'All Products', href: '/products' },
        { label: 'Categories', href: '/categories' },
      ]
    },
    {
      title: 'Account',
      items: [
        { label: 'My Profile', href: ROUTES.ACCOUNT.PROFILE },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', href: ROUTES.SUPPORT.HELP },
        { label: 'FAQ', href: ROUTES.SUPPORT.FAQ },
        { label: 'Contact Us', href: ROUTES.SUPPORT.CONTACT },
        { label: 'Shipping Info', href: '/shipping' }
      ]
    },
    {
      title: 'Company',
      items: [
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press', href: '/press' }
      ]
    }
  ],

  DASHBOARD_SIDEBAR: [
    {
      label: 'Dashboard',
      href: ROUTES.DASHBOARD.HOME,
      icon: 'dashboard'
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
      label: 'Profile',
      href: ROUTES.ACCOUNT.PROFILE,
      icon: 'user'
    },
  ]
} as const

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
} as const