import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom"
import {RoutesConst} from "../utils/consts"
import {TResponseData} from "../types/serverData"
import {TCheckerStateItem} from "../types/checkerFiltration"
import {decodeFromUrlQueriesFormat, encodeToUrlQueriesFormat} from "../utils/helperFunctions"
import {createTag, fetchTags, TTagAPI} from "../http/tagAPI"
import * as yup from "yup"
import CrudList from "../components/CrudList"
import CrudModal from "../components/CrudModal"
import CrudForm from "../components/CrudForm"
import {FormikValues} from "formik"

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  slug: yup.string().required().min(3),
  tagTypeId: yup.string().required()
})
const initialValues = {title: '', slug: '', tagTypeId: ''}
const title = "CRUD TAGS"

const CrudTags = () => {
  const {pathname} = useLocation()
  const routeConst = RoutesConst.ADMIN_ROUTE + RoutesConst.CRUD_TAGS
  const [tags, setTags] = useState<TResponseData>()
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, routeConst))
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    fetchTags().then(data => setTags(data))
  }, [])

  useMemo(() => {
    fetchTags().then(data => setTags(data))
    setCheckedFilters({page: []})
  }, [search === ''])

  useMemo(() => {
    fetchTags(encodeToUrlQueriesFormat(checkedFilters)).then(data => setTags(data))
  }, [checkedFilters])

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    e.preventDefault()
    setCheckedFilters({search: ['title', search]})
  }

  const createHandler = (items: FormikValues) => {
    createTag(items as TTagAPI).then((data => setCheckedFilters({page: []})), (reason => console.error(reason)))
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
        responseData={tags}
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

export default CrudTags;
