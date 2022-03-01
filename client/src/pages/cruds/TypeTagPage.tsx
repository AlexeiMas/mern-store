import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {fetchTagTypes, removeTagType, TTagTypeAPI, updateTagType} from "../../http/tagTypeAPI";
import {TDocs} from "../../types/serverData";
import {Container, Row} from "react-bootstrap";
import * as yup from 'yup'
import {FormikValues} from 'formik';
import {ADMIN_ROUTE, CRUD_TYPE_TAGS} from "../../utils/consts"
import CrudForm from "../../components/CrudForm"

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  slug: yup.string().required().min(3)
})

export type TTypeTagPage = {
  title: string | undefined,
  slug: string | undefined
}

const TypeTagPage = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const id = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [data, setData] = useState<TDocs>()
  const [initialValues, setInitialValues] = useState<TTypeTagPage>({title: '', slug: ''})

  useMemo(() => {
    if (data) {
      setInitialValues({
        title: String(data.title),
        slug: String(data.slug)
      })
    }
  }, [data])

  useEffect(() => {
    fetchTagTypes(`_id=${id}`).then(data => setData(data.docs[0]))
  }, [])


  const updateHandler = (items: FormikValues) => {
    updateTagType(id, items as TTagTypeAPI).then((data => console.log(data)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_TYPE_TAGS)
  }

  const removeHandler = () => {
    removeTagType(id).then((response => console.log(response)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_TYPE_TAGS)
  }

  return (
    <Container>
      <Row>
        <h1>Type Tag</h1>
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

export default TypeTagPage;
