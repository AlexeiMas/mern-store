import React from 'react';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      Admin Layout
      <Outlet/>
    </div>
  );
};

export default Admin;