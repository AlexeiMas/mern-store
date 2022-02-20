import React from 'react';
import {Provider} from "react-redux";
import {store} from "../store";
import {Navigate, Route, Routes} from 'react-router-dom';
import AdminRoutes from "./AdminRoutes";
import {getTokenItem} from "../utils/storageFunctions"
import {LOGIN_ROUTE} from "../utils/consts"

const AdminRoutesWrap = () => {
  const isToken = getTokenItem('token')

  if (!isToken) {
    return <Navigate to={LOGIN_ROUTE} replace />
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
