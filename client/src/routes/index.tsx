import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE} from "../utils/consts";
import AdminRoutesWrap from "./AdminRoutesWrap";
import ShopRoutes from "./ShopRoutes";
import Auth from "../pages/Auth";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ADMIN_ROUTE+'/*'} element={<AdminRoutesWrap/>}/>
        <Route path={HOME_ROUTE+'*'} element={<ShopRoutes/>}/>
        <Route path={LOGIN_ROUTE} element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;