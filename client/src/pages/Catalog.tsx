import React, {useContext, useEffect, useMemo, useState} from 'react';
import ProductList from "../components/ProductList";
import {ProductDispatchContext, ProductStateContext} from "../context/ProductContext"
import {Col, Form, Row} from "react-bootstrap"
import TagTypeBar from "../components/TagTypeBar"

const Catalog = () => {
  const checkedFilters = useContext(ProductStateContext)
  const setCheckedFilters = useContext(ProductDispatchContext)
  const [sort, setSort] = useState<string>(checkedFilters.sort && checkedFilters.sort.join(','))
  const [limit, setLimit] = useState<string>('5')

  useEffect(() => {
    setCheckedFilters({...checkedFilters, limit: [limit]})
  }, [limit])

  useEffect(() => {
    setCheckedFilters({...checkedFilters, sort: [sort]})
  }, [sort])

  return (
    <>
      <Col md={3}>
        <TagTypeBar/>
      </Col>
      <Col md={9}>
        <Row>
          <Col md={5} className="ms-auto">
            <Row>
              <Col md={4}>
                <Form.Select size="lg" name="limit"
                             onChange={(e) => setLimit(e.target.value)}
                             defaultValue={checkedFilters.limit ? checkedFilters.limit[0] : limit}
                >
                  <option disabled>Limit</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </Form.Select>
              </Col>
              <Col md={8}>
                <Form.Select size="lg" name="sort" onChange={(e) => setSort(e.target.value)}>
                  <option disabled>Sort By</option>
                  <option value="title,1">Title ASC</option>
                  <option value="title,-1">Title DESC</option>
                  <option value="price,1">Price ASC</option>
                  <option value="price,-1">Price DESC</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <ProductList/>
      </Col>
    </>
  );
};

export default Catalog;
