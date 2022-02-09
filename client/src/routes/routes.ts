import {
  ADMIN_DASHBOARD,
  CANCEL_ORDER,
  CHECKOUT_ROUTE,
  CRUD_USERS,
  PRODUCT_ROUTE,
  PRODUCTS_ROUTE,
  PRODUCTS_ROUTE_FILTERS,
  SUCCESS_ORDER
} from "../utils/consts";
import CrudUsers from "../pages/CrudUsers";
import CheckOut from "../pages/CheckOut";
import ProductPage from "../pages/ProductPage";
import CatalogWrapper from "../components/CatalogWrapper";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import AdminDashboard from "../pages/AdminDashboard"

export type TRoutes = {
  path: string,
  Component: () => JSX.Element
}

export const authRoutes: TRoutes[] = [
  {
    path: ADMIN_DASHBOARD,
    Component: AdminDashboard
  },
  {
    path: CRUD_USERS,
    Component: CrudUsers
  }
]

export const publicRoutes: TRoutes[] = [
  {
    path: PRODUCTS_ROUTE,
    Component: CatalogWrapper
  },
  {
    path: PRODUCTS_ROUTE_FILTERS,
    Component: CatalogWrapper
  },
  {
    path: CHECKOUT_ROUTE,
    Component: CheckOut
  },
  {
    path: PRODUCT_ROUTE,
    Component: ProductPage
  },
  {
    path: SUCCESS_ORDER,
    Component: Success
  },
  {
    path: CANCEL_ORDER,
    Component: Cancel
  }
]
