import React, {useMemo, useState} from 'react';
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap";
import {fetchTagTypes} from "../http/tagTypeAPI";
import {TResponseData} from "../types/serverData";
import {useLocation, useNavigate} from "react-router-dom";
import {RoutesConst} from "../utils/consts";
import PaginationBlock from "../components/PaginationBlock";
import {TCheckerStateItem} from "../types/checkerFiltration";
import {decodeFromUrlQueriesFormat, encodeToUrlQueriesFormat} from "../utils/helperFunctions";
import ListOptionsBlock from "../components/ListOptionsBlock";
import NoMatch from "../components/NoMatch";

const CrudTypeTags = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const routeConst = RoutesConst.ADMIN_ROUTE + RoutesConst.CRUD_TYPE_TAGS
  const [typeTags, setTypeTags] = useState<TResponseData>()
  const [typesCount, setTypesCount] = useState<number>(0)
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, routeConst))
  const [sortD, setSortD] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  useMemo(() => {
    fetchTagTypes().then(data => setTypeTags(data))
  }, [search === ''])

  useMemo(() => {
    fetchTagTypes(encodeToUrlQueriesFormat(checkedFilters)).then(data => setTypeTags(data))
  }, [checkedFilters])

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    e.preventDefault()
    setCheckedFilters({search: ['title', search]})
  }

  const tableKeys = typeTags && typeTags.docs.length !== 0 && Object.keys(typeTags.docs[0]).map(name =>
    <th
      key={name}
      onClick={() => {
        setSortD(prevState => prevState === 1 ? -1 : 1)
        setCheckedFilters({...checkedFilters, sort: [name, String(sortD)]})
      }}
    >
      {checkedFilters['sort'] && (checkedFilters['sort'][0] === name) && (checkedFilters['sort'][1] === String(-1)) &&
      <i className="bi bi-sort-down"/>}
      {checkedFilters['sort'] && (checkedFilters['sort'][0] === name) && (checkedFilters['sort'][1] === String(1)) &&
      <i className="bi bi-sort-up"/>}
      {name}
    </th>
  )

  const tableValues = (data: { [key: string]: string | number }) => typeTags && typeTags.docs.length !== 0 && Object.values(data).map((value, i, arr) =>
    <td key={i} width={`${(100 / arr.length)}%`}>{value}</td>
  )

  console.log(typeTags)
  return (
    <Container>
      <Row>
        <h1>CRUD TYPE TAGS</h1>
      </Row>
      <ListOptionsBlock
        checkedFilters={checkedFilters}
        setCheckedFilters={setCheckedFilters}
        productsCount={typesCount}
        isSort={false}
        widthBlockCol={12}
      >
        <Col md={8} className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchHandler(e)}/>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant='primary'>Create</Button>
        </Col>
      </ListOptionsBlock>
      <Row className="mt-3">
        {
          typeTags && typeTags.docs.length !== 0
            ?
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
              <PaginationBlock
                data={typeTags}
                setDocsListCount={setTypesCount}
                checkedFilters={checkedFilters}
                setCheckedFilters={setCheckedFilters}
              />
            </>
            :
            typeTags
              ?
              <NoMatch/>
              :
              <Spinner animation={"border"}/>
        }
      </Row>
    </Container>
  );
};

export default CrudTypeTags;
