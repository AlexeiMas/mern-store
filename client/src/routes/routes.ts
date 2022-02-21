import {
  ADMIN_ANALYTICS,
  ADMIN_DASHBOARD, ADMIN_SETTINGS,
  CANCEL_ORDER, CART_ROUTE,
  CHECKOUT_ROUTE, CRUD_ORDERS, CRUD_TAGS, CRUD_TYPE_TAGS,
  CRUD_USERS,
  HOME_ROUTE,
  PRODUCT_ROUTE,
  PRODUCTS_ROUTE,
  SEARCH_ROUTE,
  SUCCESS_ORDER
} from "../utils/consts";
import CrudUsers from "../pages/CrudUsers";
import CheckOut from "../pages/CheckOut";
import ProductPage from "../pages/ProductPage";
import CatalogWrapper from "../components/CatalogWrapper";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import AdminDashboard from "../pages/AdminDashboard"
import Search from "../pages/Search";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import CrudTypeTags from "../pages/CrudTypeTags";
import CrudTags from "../pages/CrudTags";
import CrudOrders from "../pages/CrudOrders";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import TypeTagPage from "../pages/cruds/TypeTagPage";

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
  },
  {
    path: CRUD_TYPE_TAGS,
    Component: CrudTypeTags
  },
  {
    path: `${CRUD_TYPE_TAGS}/:id`,
    Component: TypeTagPage
  },
  {
    path: CRUD_TAGS,
    Component: CrudTags
  },
  {
    path: CRUD_ORDERS,
    Component: CrudOrders
  },
  {
    path: ADMIN_ANALYTICS,
    Component: Analytics
  },
  {
    path: ADMIN_SETTINGS,
    Component: Settings
  }
]

export const publicRoutes: TRoutes[] = [
  {
    path: HOME_ROUTE,
    Component: Home
  },
  {
    path: PRODUCTS_ROUTE,
    Component: CatalogWrapper
  },
  {
    path: `${PRODUCTS_ROUTE}/:url`,
    Component: CatalogWrapper
  },
  {
    path: `${SEARCH_ROUTE}/:search`,
    Component: Search
  },
  {
    path: CART_ROUTE,
    Component: Cart
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
