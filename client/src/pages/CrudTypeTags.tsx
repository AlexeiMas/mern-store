import React, {useEffect, useState} from 'react';
import {Container, Row, Table} from "react-bootstrap";
import {fetchTagTypes} from "../http/tagTypeAPI";
import {TResponseData} from "../types/serverData";
import {useLocation, useNavigate} from "react-router-dom";
import {RoutesConst} from "../utils/consts";
import PaginationBlock from "../components/PaginationBlock";
import {TCheckerStateItem} from "../types/checkerFiltration";
import {decodeFromUrlQueriesFormat, encodeToUrlQueriesFormat} from "../utils/helperFunctions";

const CrudTypeTags = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const routeConst = RoutesConst.ADMIN_ROUTE+RoutesConst.CRUD_TYPE_TAGS
  const [typeTags, setTypeTags] = useState<TResponseData>()
  const [typesCount, setTypesCount] = useState<number>(0)
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, routeConst))
  const [sortD, setSortD] = useState<number>(1)

  useEffect(() => {
    fetchTagTypes().then(data => setTypeTags(data))
  }, [])

  useEffect(() => {
    fetchTagTypes(encodeToUrlQueriesFormat(checkedFilters)).then(data => setTypeTags(data))
  }, [checkedFilters])

  const tableKeys = typeTags && Object.keys(typeTags.docs[0]).map(name =>
    <th key={name} onClick={() => {
      setSortD(prevState => prevState === 1 ? -1 : 1)
      setCheckedFilters({...checkedFilters, sort: [name,String(sortD)]})}
    }>
      {checkedFilters['sort'] && (checkedFilters['sort'][0] === name) && (checkedFilters['sort'][1] === String(-1)) && <i className="bi bi-sort-down"/>}
      {checkedFilters['sort'] && (checkedFilters['sort'][0] === name) && (checkedFilters['sort'][1] === String(1)) && <i className="bi bi-sort-up"/>}
      {name}
    </th>
  )

  const tableValues = (data: { [key: string]: string | number }) => typeTags && Object.values(data).map((value, i, arr) =>
    <td key={i} width={`${(100/arr.length)}%`}>{value}</td>
  )

  console.log(checkedFilters)

  return (
    <Container>
      <Row>
        <h1>CRUD TYPE TAGS</h1>
      </Row>
      <Row>
        {
          typeTags &&
          <>
            <Table striped bordered hover responsive>
              <thead>
              <tr>{tableKeys}</tr>
              </thead>
              <tbody>
              {typeTags && typeTags.docs.map((item) =>
                <tr key={item._id} style={{cursor: 'pointer'}} onClick={() => navigate(item._id)}>
                  {tableValues(item)}
                </tr>
              )}
              </tbody>
            </Table>
            <PaginationBlock data={typeTags} setDocsListCount={setTypesCount} checkedFilters={checkedFilters} setCheckedFilters={setCheckedFilters}/>
          </>
        }
      </Row>
    </Container>
  );
};

export default CrudTypeTags;
