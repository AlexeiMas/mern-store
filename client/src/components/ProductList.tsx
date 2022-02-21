import React, {FC, useEffect, useState} from 'react';
import {Row, Spinner} from "react-bootstrap";
import {useLocation} from "react-router-dom"
import ProductItem from "./ProductItem";
import {TServerData} from "../types/serverData";
import {TShopFiltration} from "../types/checkerFiltration"
import PaginationBlock from "./PaginationBlock";

const ProductList: FC<TShopFiltration> = (
  {
    checkedFilters,
    setCheckedFilters,
    fetchDataCB,
    routeSlug,
    routeConst,
    setProductsCount
  }) => {
  const {pathname} = useLocation()
  const [products, setProducts] = useState<TServerData>()

  useEffect(() => {
    let pathnameFilter = '';

    if (pathname.includes(routeSlug)) {
      pathnameFilter = pathname.split(routeSlug)[1]
    }

    fetchDataCB(pathnameFilter).then(data => setProducts(data))
    if (pathname === String(routeConst)) {
      setCheckedFilters({})
    }
  }, [pathname])


  useEffect(() => {
    if (products && products.totalPages < 2) {
      setCheckedFilters({...checkedFilters, page: []})
    }
  }, [products && products.totalPages < 2])

  return (
    <Row style={{borderTop: '1px solid #ccc', marginTop: '1rem'}}>
      {products
        ?
        <>
          {
            products.docs.map((product) =>
              <ProductItem
                key={product._id}
                product={product}
              />
            )
          }
        <PaginationBlock
          data={products}
          setDocsListCount={setProductsCount}
          checkedFilters={checkedFilters}
          setCheckedFilters={setCheckedFilters}
        />
        </>
        :
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
    </Row>
  );
};

export default ProductList;
