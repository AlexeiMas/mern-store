import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom"
import {RoutesConst} from "../utils/consts"
import {TResponseData} from "../types/serverData"
import {TCheckerStateItem} from "../types/checkerFiltration"
import {decodeFromUrlQueriesFormat, encodeToUrlQueriesFormat} from "../utils/helperFunctions"
import {createUser, fetchUsers, TUserAPI} from "../http/userAPI"
import * as yup from "yup"
import CrudList from "../components/CrudList"
import CrudModal from "../components/CrudModal"
import CrudForm from "../components/CrudForm"
import {FormikValues} from "formik"

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(3)
})
const initialValues = {name: '', email: '', password: ''}
const title = "CRUD USERS"

const CrudUsers = () => {
  const {pathname} = useLocation()
  const routeConst = RoutesConst.ADMIN_ROUTE + RoutesConst.CRUD_USERS
  const [users, setUsers] = useState<TResponseData>()
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, routeConst))
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    fetchUsers().then(data => setUsers(data))
  }, [])

  useMemo(() => {
    fetchUsers().then(data => setUsers(data))
    setCheckedFilters({page: []})
  }, [search === ''])

  useMemo(() => {
    fetchUsers(encodeToUrlQueriesFormat(checkedFilters)).then(data => setUsers(data))
  }, [checkedFilters])

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    e.preventDefault()
    setCheckedFilters({search: ['name', search]})
  }

  const createHandler = (items: FormikValues) => {
    createUser(items as TUserAPI).then((data => setCheckedFilters({page: []})), (reason => console.error(reason)))
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
        responseData={users}
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

export default CrudUsers;
