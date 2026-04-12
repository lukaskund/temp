/**
 * Paths relative to Playwright `baseURL`.
 * Do not use a leading `/` when `baseURL` includes a path (e.g. `/pawshop/`).
 */
export const ROUTES = {
  home: './',
  shop: 'shop.html',
  product: (id: number) => `product.html?id=${id}`,
  cart: 'cart.html',
  checkout: 'checkout.html',
  confirmation: 'confirmation.html',
  login: 'login.html',
  register: 'register.html',
  contact: 'contact.html',
} as const;

export const ROUTE_PATTERNS = {
  home: /\/(?:index\.html)?(?:\?.*)?$/,
} as const;
