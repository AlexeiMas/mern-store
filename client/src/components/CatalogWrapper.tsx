import React, {useState} from 'react';
import Catalog from "../pages/Catalog";
import {useLocation} from "react-router-dom"
import {TCheckerStateItem} from "../types/checkerFiltration"
import {decodeFromUrlQueriesFormat} from "../utils/helperFunctions"
import {RoutesConst} from "../utils/consts"

const CatalogWrapper = () => {
  const {pathname} = useLocation()
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, RoutesConst.PRODUCTS_ROUTE))

  return (
      <Catalog
        checkedFilters={checkedFilters}
        setCheckedFilters={setCheckedFilters}
      />
  );
};

export default CatalogWrapper;
