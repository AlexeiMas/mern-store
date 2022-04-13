import React from 'react';
import {Provider} from "react-redux";
import {store} from "../store";
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import AdminRoutes from "./AdminRoutes";
import {getTokenItem} from "../utils/storageFunctions"
import {ADMIN_ROUTE, DASHBOARD, LOGIN_ROUTE} from "../utils/consts"

const AdminRoutesWrap = () => {
  const {pathname} = useLocation()
  const isToken = getTokenItem('token')

  if (!isToken) {
    return <Navigate to={LOGIN_ROUTE} replace/>
  } else {
    if (pathname === ADMIN_ROUTE)
      return <Navigate to={DASHBOARD} replace/>
  }

  return (
    <Provider store={store}>
      <Routes>
        <Route path="*" element={<AdminRoutes/>}/>
      </Routes>
    </Provider>
  );
};

export default AdminRoutesWrap;
