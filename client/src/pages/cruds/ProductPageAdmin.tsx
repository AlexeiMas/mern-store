import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {fetchProductDataById, removeProduct, TProductAPI, updateProduct} from "../../http/productAPI";
import {TDocs} from "../../types/serverData";
import {Container, Row} from "react-bootstrap";
import * as yup from 'yup'
import {FormikValues} from 'formik';
import {ADMIN_ROUTE, CRUD_PRODUCTS} from "../../utils/consts"
import CrudForm from "../../components/CrudForm"

//TODO configurate schema
const schema = yup.object().shape({
  title: yup.string().required().min(3),
  price: yup.number().required(),
  description: yup.string().required().min(10),
  tagsIds: yup.string().required(),
  slug: yup.string().required().min(3),
  image: yup.mixed()
    .required("A file is required")
    // .test('fileFormat', 'Unsupported File Format', function (value) {
    //   const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
    //   return SUPPORTED_FORMATS.includes(value.type)
    // })
    // .test('fileSize', "File Size is too large", value => {
    //   const sizeInBytes = 3000000; // 3MB
    //   return value.size <= sizeInBytes;
    // })

})

export type TProductPage = {
  title: string | undefined,
  price: number | undefined,
  description: string | undefined,
  tagsIds: string | undefined,
  slug: string | undefined,
  image: string | undefined
}

const ProductPageAdmin = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const id = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [data, setData] = useState<TDocs>()
  const [initialValues, setInitialValues] = useState<TProductPage>({title: '', price: 0, description: '', tagsIds: '', slug: '', image: ''})

  useMemo(() => {
    if (data) {
      setInitialValues({
        title: String(data.title),
        price: Number(data.price),
        description: String(data.description),
        tagsIds: String(data.tagsIds),
        slug: String(data.slug),
        image: String(data.image)
      })
    }
  }, [data])

  useEffect(() => {
    fetchProductDataById(`${id}`).then(data => setData(data))
  }, [])

  //TODO remove comments for functionality
  const updateHandler = (items: FormikValues) => {
    console.log(items)
    // updateProduct(id, items as TProductAPI).then((data => console.log(data)), (reason => console.error(reason)))
    // navigate(ADMIN_ROUTE + CRUD_PRODUCTS)
  }

  const removeHandler = () => {
    removeProduct(id).then((response => console.log(response)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_PRODUCTS)
  }

  return (
    <Container>
      <Row>
        <h1>Product</h1>
      </Row>
      <Row>
        {
          data &&
          <CrudForm
            schema={schema}
            initialValues={initialValues}
            updateHandler={updateHandler}
            removeHandler={removeHandler}
          />
        }
      </Row>
    </Container>
  );
};

export default ProductPageAdmin;
