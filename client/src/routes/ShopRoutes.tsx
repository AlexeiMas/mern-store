import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Shop from "../layouts/Shop";
import {publicRoutes} from "./routes";
import {HOME_ROUTE, PRODUCTS_ROUTE} from "../utils/consts";

const ShopRoutes = () => {
  const {pathname} = useLocation()
  if (pathname === PRODUCTS_ROUTE + '/') {
    return <Navigate to={PRODUCTS_ROUTE} replace/>
  }
  return (
    <Routes>
      <Route element={<Shop/>}>
        {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>}/>
        )}
      </Route>
      <Route path='*' element={<Navigate to={HOME_ROUTE}/>}/>
    </Routes>
  );
};

export default ShopRoutes;
