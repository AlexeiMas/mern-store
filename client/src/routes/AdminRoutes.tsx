import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Route, Routes} from 'react-router-dom';
import Admin from '../layouts/Admin';
import {authRoutes} from "./routes";

const AdminRoutesWrapper = () => {
  const {isAuth} = useTypedSelector(state => state.user)
  return (
      <Routes>
        <Route element={<Admin/>}>
          {authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>}/>
          )}
        </Route>
      </Routes>
  );
};

export default AdminRoutesWrapper;
