import React from 'react';
import {Provider} from "react-redux";
import {store} from "../store";
import {Route, Routes} from 'react-router-dom';
import AdminRoutes from "./AdminRoutes";

const AdminRoutesWrap = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="*" element={<AdminRoutes/>}/>
      </Routes>
    </Provider>
  );
};

export default AdminRoutesWrap;