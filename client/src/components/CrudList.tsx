import React, {FC, useState} from 'react';
import {Button, Col, Container, Form, Row, Spinner, Table} from "react-bootstrap"
import ListOptionsBlock from "./ListOptionsBlock"
import PaginationBlock from "./PaginationBlock"
import NoMatch from "./NoMatch"
import {TResponseData} from "../types/serverData"
import {TCheckerDispatch, TCheckerStateItem} from "../types/checkerFiltration"
import {useNavigate} from "react-router-dom"
import {textLengthSlicer} from "../utils/textLengthSlicer"

export type TCrudList = {
  title: string
  responseData: TResponseData | undefined
  checkedFilters: TCheckerStateItem
  setCheckedFilters: TCheckerDispatch
  search: string
  setSearch: React.Dispatch<string>
  searchHandler: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => void,
  setModal: React.Dispatch<boolean>
}

const CrudList: FC<TCrudList> = (
  {
    title,
    responseData,
    checkedFilters,
    setCheckedFilters,
    searchHandler,
    search,
    setSearch,
    setModal
  }) => {
  const navigate = useNavigate()
  const [typesCount, setTypesCount] = useState<number>(0)
  const [sortDirection, setSortDirection] = useState<number>(1)

  const tableKeys = responseData && responseData.docs.length !== 0 && Object.keys(responseData.docs[0]).map(name =>
    <th
      key={name}
      onClick={() => {
        setSortDirection(prevState => prevState === 1 ? -1 : 1)
        setCheckedFilters({...checkedFilters, sort: [name, String(sortDirection)]})
      }}
    >
      {checkedFilters['sort'] && (checkedFilters['sort'][0] === name) && (checkedFilters['sort'][1] === String(-1)) &&
      <i className="bi bi-sort-down"/>}
      {checkedFilters['sort'] && (checkedFilters['sort'][0] === name) && (checkedFilters['sort'][1] === String(1)) &&
      <i className="bi bi-sort-up"/>}
      {name}
    </th>
  )

  const tableValues = (data: { [key: string]: string | number }) =>
    responseData && responseData.docs.length !== 0
    &&
    Object.entries(data).map((value, i, arr) =>
      <td key={i} width={`${(100 / arr.length)}%`}>{textLengthSlicer(String(value[1]), 40)}</td>
    )

  return (
    <Container>
      <Row>
        <h1 className="text-uppercase">{title}</h1>
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
          <Button variant='primary' onClick={() => setModal(true)}>Create</Button>
        </Col>
      </ListOptionsBlock>
      <Row className="mt-3">
        {
          responseData && responseData.docs.length !== 0
            ?
            <>
              <Table striped bordered hover responsive>
                <thead>
                <tr>{tableKeys}</tr>
                </thead>
                <tbody>
                {responseData && responseData.docs.map((item) =>
                  <tr key={item._id} style={{cursor: 'pointer'}} onClick={() => navigate(item._id)}>
                    {tableValues(item)}
                  </tr>
                )}
                </tbody>
              </Table>
              <PaginationBlock
                data={responseData}
                setDocsListCount={setTypesCount}
                checkedFilters={checkedFilters}
                setCheckedFilters={setCheckedFilters}
              />
            </>
            :
            responseData ? <NoMatch/> : <Spinner animation={"border"}/>
        }
      </Row>
    </Container>
  );
};

export default CrudList;
