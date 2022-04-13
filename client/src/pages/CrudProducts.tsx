import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom"
import {RoutesConst} from "../utils/consts"
import {TResponseData} from "../types/serverData"
import {TCheckerStateItem} from "../types/checkerFiltration"
import {decodeFromUrlQueriesFormat, encodeToUrlQueriesFormat} from "../utils/helperFunctions"
import {createProduct, fetchProducts, TProductAPI} from "../http/productAPI"
import * as yup from "yup"
import CrudList from "../components/CrudList"
import CrudModal from "../components/CrudModal"
import CrudForm from "../components/CrudForm"
import {FormikValues} from "formik"
//TODO configurate schema
const schema = yup.object().shape({
  title: yup.string().required().min(3),
  price: yup.number().required(),
  description: yup.string().required().min(10),
  tagTypeId: yup.string().required(),
  slug: yup.string().required().min(3),
  // image: yup.mixed()
  //   .required("A file is required")
  //   .test('fileFormat', 'Unsupported File Format', value => {
  //     const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  //     return value && SUPPORTED_FORMATS.includes(value.type)
  //   })
  //   .test('fileSize', "File Size is too large", value => {
  //     const sizeInBytes = 3000000; // 3MB
  //     return value && value.size <= sizeInBytes;
  //   })
  image: yup.array().of(yup.object().shape({
    file: yup.mixed().test('fileSize', 'Размер файла больше 10 байт', (value) => {
      if (!value) return false
      return value.size < 10
    }).required(),
    type: yup.string().oneOf(['image/jpg', 'image/jpeg', 'image/png'], 'Добавьте файл с правильным форматов').required(),
    // name: yup.string().required()
  }).typeError('Добавьте файл')).required()
})
const initialValues = {title: '', price: 0, description: '', tagsIds: '', slug: '', image: []}
const title = "CRUD PRODUCTS"

const CrudProducts = () => {
  const {pathname} = useLocation()
  const routeConst = RoutesConst.ADMIN_ROUTE + RoutesConst.CRUD_PRODUCTS
  const [products, setProducts] = useState<TResponseData>()
  const [checkedFilters, setCheckedFilters] = useState<TCheckerStateItem>(decodeFromUrlQueriesFormat(pathname, routeConst))
  const [search, setSearch] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    fetchProducts().then(data => setProducts(data))
  }, [])

  useMemo(() => {
    fetchProducts().then(data => setProducts(data))
    setCheckedFilters({page: []})
  }, [search === ''])

  useMemo(() => {
    fetchProducts('/' + encodeToUrlQueriesFormat(checkedFilters)).then(data => setProducts(data))
  }, [checkedFilters])

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent) => {
    e.preventDefault()
    setCheckedFilters({search: ['title', search]})
  }

  const createHandler = (items: FormikValues) => {
    createProduct(items as TProductAPI).then((data => setCheckedFilters({page: []})), (reason => console.error(reason)))
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
        responseData={products}
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

export default CrudProducts;
