import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Shop from "../layouts/Shop";
import {publicRoutes} from "./routes";
import {PRODUCTS_ROUTE} from "../utils/consts";

const ShopRoutes = () => {
  return (
    <Routes>
      <Route element={<Shop/>}>
        {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={<Component/>}/>
        )}
      </Route>
      <Route path='*' element={<Navigate to={PRODUCTS_ROUTE}/>}/>
    </Routes>
  );
};

export default ShopRoutes;
