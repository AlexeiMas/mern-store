export const ADMIN_ROUTE = '/admin'
export const LOGIN_ROUTE = `${ADMIN_ROUTE}/login`
export const LOGIN_REQUEST = `/login`
export const HOME_ROUTE = '/'
export const PRODUCTS_ROUTE = '/catalog'
export const CART_ROUTE = '/cart'
export const CHECKOUT_ROUTE = `${CART_ROUTE}/checkout`
export const PRODUCT_ROUTE = '/product/:slug'
export const SEARCH_ROUTE = '/search'

export const ADMIN_DASHBOARD = `${ADMIN_ROUTE}/dashboard`
export const CRUD_USERS = '/crud-users'
export const CRUD_TAGS = '/crud-tags'
export const CRUD_PRODUCTS = '/crud-products'
export const CRUD_ORDERS = '/crud-orders'
export const ADMIN_SETTINGS = '/settings'
export const ADMIN_ANALYTICS = '/analytics'

export const SUCCESS_ORDER = '/success'
export const CANCEL_ORDER = '/cancel'

export enum RoutesConst {
  ADMIN_ROUTE = ADMIN_ROUTE.valueOf(),
  LOGIN_ROUTE = LOGIN_ROUTE.valueOf(),
  LOGIN_REQUEST = LOGIN_REQUEST.valueOf(),
  HOME_ROUTE = HOME_ROUTE.valueOf(),
  PRODUCTS_ROUTE = PRODUCTS_ROUTE.valueOf(),
  CHECKOUT_ROUTE = CHECKOUT_ROUTE.valueOf(),
  PRODUCT_ROUTE = PRODUCT_ROUTE.valueOf(),
  SEARCH_ROUTE = SEARCH_ROUTE.valueOf(),
  CART_ROUTE = CART_ROUTE.valueOf(),
  ADMIN_DASHBOARD = ADMIN_DASHBOARD.valueOf(),
  CRUD_USERS = CRUD_USERS.valueOf(),
  CRUD_TAGS = CRUD_TAGS.valueOf(),
  CRUD_PRODUCTS = CRUD_PRODUCTS.valueOf(),
  CRUD_ORDERS = CRUD_ORDERS.valueOf(),
  ADMIN_SETTINGS = ADMIN_SETTINGS.valueOf(),
  ADMIN_ANALYTICS = ADMIN_ANALYTICS.valueOf(),
  SUCCESS_ORDER = SUCCESS_ORDER.valueOf(),
  CANCEL_ORDER = CANCEL_ORDER.valueOf(),
}
