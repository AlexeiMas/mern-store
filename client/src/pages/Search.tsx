import React, {useContext, useEffect, useState} from 'react';
import ProductList from "../components/ProductList";
import {ProductDispatchContext, ProductStateContext} from "../context/ProductContext"
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap"
import TagTypeBar from "../components/TagTypeBar"
import {useNavigate} from "react-router-dom";

const Search = () => {
  // const navigate = useNavigate()
  // const checkedFilters = useContext(ProductStateContext)
  // const setCheckedFilters = useContext(ProductDispatchContext)
  // const [sort, setSort] = useState<string>(checkedFilters.sort && checkedFilters.sort.join(','))
  // const [limit, setLimit] = useState<string>('5')
  // const [search, setSearch] = useState<string>('')

  // useEffect(() => {
  //   setCheckedFilters({...checkedFilters, limit: [limit]})
  // }, [limit])
  //
  // useEffect(() => {
  //   setCheckedFilters({...checkedFilters, sort: [sort]})
  // }, [sort])

  // const onSearchHandler = () => {
  //   console.log(search)
  //   // navigate(`/=${search}`)
  //   // // setCheckedFilters({})
  // }
  //
  // console.log(search)

  return (
    <>
      <Col md={3}>
        <TagTypeBar/>
      </Col>
      <Col md={9}>
        <Row>
          <Col md={7} className="ms-auto">
            <InputGroup>
              <FormControl
                  style={{lineHeight: '2rem'}}
                  // onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="I search ..."
                  aria-label="Search"
                  aria-describedby="search-products"
              />
              <Button
                  variant="outline-secondary"
                  id="search"
                  // onClick={() => onSearchHandler()}
              >
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col md={5} className="ms-auto">
            <Row>
              <Col md={4}>
                <Form.Select size="lg" name="limit"
                             // onChange={(e) => setLimit(e.target.value)}
                             // defaultValue={checkedFilters.limit ? checkedFilters.limit[0] : limit}
                >
                  <option disabled>Limit</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </Form.Select>
              </Col>
              <Col md={8}>
                <Form.Select size="lg" name="sort"
                             // onChange={(e) => setSort(e.target.value)}
                >
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
        {/*<ProductList/>*/}
      </Col>
    </>
  );
};

export default Search;
