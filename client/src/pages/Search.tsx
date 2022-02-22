import React, {useState} from 'react';
import ProductList from "../components/ProductList";
import {Col, Row} from "react-bootstrap"
import {useLocation} from "react-router-dom";
import {searchByName} from "../http/searchAPI"
import {RoutesConst} from "../utils/consts"
import ListOptionsBlock from "../components/ListOptionsBlock"
import {TCheckerStateItem} from "../types/checkerFiltration"
import {decodeFromUrlQueriesFormat} from "../utils/helperFunctions"
import TagTypeBar from "../components/TagTypeBar"

const Search = () => {
  const {pathname} = useLocation()
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, RoutesConst.SEARCH_ROUTE))
  const [productsCount, setProductsCount] = useState<number>(0)

  return (
    <Row>
      <Col md={3}>
        {
          productsCount !== 0 &&
          <TagTypeBar
            checkedFilters={checkedFilters}
            setCheckedFilters={setCheckedFilters}
            fetchDataCB={searchByName}
            routeSlug={'search'}
            routeConst={RoutesConst.SEARCH_ROUTE}
          />
        }
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
          fetchDataCB={searchByName}
          routeSlug={'search'}
          routeConst={RoutesConst.SEARCH_ROUTE}
          setProductsCount={setProductsCount}
        />
      </Col>
    </Row>
  );
};

export default Search;
