import React, {FC, useEffect, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap"
import {TFiltersProduct} from "../types/checkerFiltration"

export type TProductOptionsBlock = TFiltersProduct & {productsCount: number}

const ProductOptionsBlock: FC<TProductOptionsBlock> = ({checkedFilters, setCheckedFilters, productsCount}) => {
  const [sort, setSort] = useState<string>(checkedFilters.sort && checkedFilters.sort.join(','))
  const [limit, setLimit] = useState<string>('5')

  useEffect(() => {
    const filtersData = {...checkedFilters, limit: [limit]}
    if (!productsCount) {
      Object.defineProperty(filtersData, 'page', {value: []})
    }
    console.log(filtersData)
    setCheckedFilters(filtersData)
  }, [limit])

  useEffect(() => {
    const filtersData = {...checkedFilters, sort: [sort]}
    if (!productsCount) {
      Object.defineProperty(filtersData, 'page', {value: []})
    }
    setCheckedFilters(filtersData)
  }, [sort])

  return (
    <Row>
      <Col md={5} className="ms-auto w-auto">
        <Row>
          <Col md={4}>
            <Form.Select
              size="lg"
              name="limit"
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
  );
};

export default ProductOptionsBlock;
