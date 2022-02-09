import React from 'react';
import Catalog from "../pages/Catalog";
import ProductContext from "../context/ProductContext";

const CatalogWrapper = () => {
  return (
    <ProductContext>
      <Catalog/>
    </ProductContext>
  );
};

export default CatalogWrapper;