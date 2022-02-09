import React, {useContext, useEffect, useState} from 'react';
import {Pagination, Row, Spinner} from "react-bootstrap";
import ProductItem from "./ProductItem";
import {fetchProducts} from "../http/productAPI";
import {TServerData} from "../types/serverData";
import {useLocation} from "react-router-dom"
import {ProductDispatchContext, ProductStateContext} from "../context/ProductContext"

const ProductList = () => {
  const {pathname} = useLocation()
  const [products, setProducts] = useState<TServerData>()
  const [pagination, setPagination] = useState<React.ReactElement[]>([])
  const checkedFilters = useContext(ProductStateContext)
  const setCheckedFilters = useContext(ProductDispatchContext)

  const paginationCreator = () => {
    if (products) {
      let active = products.page
      const items = []
      for (let number = 1; number <= products.totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            style={{cursor: "default"}}
            onClick={() => {
              if (number !== active) {
                (number === 1 || active > products.totalPages)
                  ? setCheckedFilters({...checkedFilters, page: []})
                  : setCheckedFilters({...checkedFilters, page: [String(number)]})
              }
            }
            }
          >
            {number}
          </Pagination.Item>
        )
      }
      setPagination(items)
    }
  }

  useEffect(() => {
    fetchProducts(pathname).then(data => setProducts(data))
    if (pathname === '/') {
      setCheckedFilters({})
    }
  }, [pathname])

  useEffect(() => {
    paginationCreator()
  }, [products])

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
            products.docs.map(({_id, title, image, description, price, slug}) =>
              <ProductItem
                key={_id}
                slug={slug as string}
                title={title as string}
                image={image as string}
                description={description as string}
                price={price as number}
              />
            )
          }
          {
            products.totalPages > 1
              ? <Pagination style={{marginLeft: '.75rem'}}>{pagination}</Pagination>
              : products.docs.length < 1 && <p className="fs-1 fst-italic text-center">No match for your request...</p>
          }
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
