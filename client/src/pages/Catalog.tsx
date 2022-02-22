import React, {FC, useState} from 'react';
import ProductList from "../components/ProductList";
import {Col, Row} from "react-bootstrap"
import TagTypeBar from "../components/TagTypeBar"
import {RoutesConst} from "../utils/consts";
import {TFiltersProduct} from "../types/checkerFiltration"
import ListOptionsBlock from "../components/ListOptionsBlock"
import {fetchProducts} from "../http/productAPI"

const Catalog: FC<TFiltersProduct> = ({checkedFilters, setCheckedFilters}) => {
  const [productsCount, setProductsCount] = useState<number>(0)

  console.log(productsCount)

  return (
    <Row>
      <Col md={3}>
        <TagTypeBar
          checkedFilters={checkedFilters}
          setCheckedFilters={setCheckedFilters}
          fetchDataCB={fetchProducts}
          routeSlug={'catalog'}
          routeConst={RoutesConst.PRODUCTS_ROUTE}
        />
      </Col>
      <Col md={9}>
        {
          productsCount !== 0 &&
          <ListOptionsBlock
              checkedFilters={checkedFilters}
              setCheckedFilters={setCheckedFilters}
              productsCount={productsCount}
          />
        }
        <ProductList
          checkedFilters={checkedFilters}
          setCheckedFilters={setCheckedFilters}
          fetchDataCB={fetchProducts}
          routeSlug={'catalog'}
          routeConst={RoutesConst.PRODUCTS_ROUTE}
          setProductsCount={setProductsCount}
        />
      </Col>
    </Row>
  );
};

export default Catalog;
