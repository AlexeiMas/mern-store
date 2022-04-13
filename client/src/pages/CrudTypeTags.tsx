import React, {useEffect, useMemo, useState} from 'react';
import {createTagType, fetchTagTypes, TTagTypeAPI} from "../http/tagTypeAPI";
import {TResponseData} from "../types/serverData";
import {useLocation} from "react-router-dom";
import {RoutesConst} from "../utils/consts";
import {TCheckerStateItem} from "../types/checkerFiltration";
import {decodeFromUrlQueriesFormat, encodeToUrlQueriesFormat} from "../utils/helperFunctions";
import CrudList from "../components/CrudList"
import * as yup from "yup"
import CrudModal from "../components/CrudModal"
import CrudForm from "../components/CrudForm"
import {FormikValues} from "formik"

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  slug: yup.string().required().min(3)
})
const initialValues = {title: '', slug: ''}
const title = "CRUD TYPE TAGS"

const CrudTypeTags = () => {
  const {pathname} = useLocation()
  const routeConst = RoutesConst.ADMIN_ROUTE + RoutesConst.CRUD_TYPE_TAGS
  const [typeTags, setTypeTags] = useState<TResponseData>()
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, routeConst))
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    fetchTagTypes().then(data => setTypeTags(data))
  }, [])

  useMemo(() => {
    fetchTagTypes().then(data => setTypeTags(data))
    setCheckedFilters({page: []})
  }, [search === ''])

  useMemo(() => {
    fetchTagTypes(encodeToUrlQueriesFormat(checkedFilters)).then(data => setTypeTags(data))
  }, [checkedFilters])

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    e.preventDefault()
    setCheckedFilters({search: ['title', search]})
  }

  const createHandler = (items: FormikValues) => {
    createTagType(items as TTagTypeAPI).then((data => setCheckedFilters({page: []})), (reason => console.error(reason)))
    setModal(false)
  }

  const modalCrud = (
    <CrudModal
      title={title}
      show={modal}
      onHide={() => setModal(false)}
    >
      <CrudForm
        schema={schema}
        initialValues={initialValues}
        createHandler={createHandler}
      />
    </CrudModal>
  )

  return (
    <>
      <CrudList
        title={title}
        responseData={typeTags}
        checkedFilters={checkedFilters}
        setCheckedFilters={setCheckedFilters}
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
        setModal={setModal}
      />
      {modalCrud}
    </>
  );
};

export default CrudTypeTags;
