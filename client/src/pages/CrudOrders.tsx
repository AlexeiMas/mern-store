import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom"
import {RoutesConst} from "../utils/consts"
import {TResponseData} from "../types/serverData"
import {TCheckerStateItem} from "../types/checkerFiltration"
import {decodeFromUrlQueriesFormat, encodeToUrlQueriesFormat} from "../utils/helperFunctions"
import {createOrder, fetchOrders} from "../http/orderAPI"
import * as yup from "yup"
import CrudList from "../components/CrudList"
import CrudModal from "../components/CrudModal"
import CrudForm from "../components/CrudForm"
import {FormikValues} from "formik"
import {TOrderData} from "../types/orderData"

const schema = yup.object().shape({
  firstName: yup.string().required(),
  secondName: yup.string().required(),
  phone: yup.number().required().min(9),
  deliveryAddress: yup.string().required(),
  email: yup.string().email().required(),
  productItems: yup.array().of(
    yup.object().shape({
      idProd: yup.string().required(),
      quantity: yup.number().required(),
      price: yup.number().required()
    })
  ),
})
const initialValues = {firstName: '', secondName: '', phone: 0, deliveryAddress: '', email: '', productItems: []}
const title = "CRUD ORDERS"

const CrudOrders = () => {
  const {pathname} = useLocation()
  const routeConst = RoutesConst.ADMIN_ROUTE + RoutesConst.CRUD_ORDERS
  const [orders, setOrders] = useState<TResponseData>()
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, routeConst))
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    fetchOrders().then(data => setOrders(data))
  }, [])

  useMemo(() => {
    fetchOrders().then(data => setOrders(data))
    setCheckedFilters({page: []})
  }, [search === ''])

  useMemo(() => {
    fetchOrders(encodeToUrlQueriesFormat(checkedFilters)).then(data => setOrders(data))
  }, [checkedFilters])

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    e.preventDefault()
    setCheckedFilters({search: ['secondName', search]})
  }

  const createHandler = (items: FormikValues) => {
    createOrder(items as TOrderData).then((data => setCheckedFilters({page: []})), (reason => console.error(reason)))
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
        responseData={orders}
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

export default CrudOrders;
