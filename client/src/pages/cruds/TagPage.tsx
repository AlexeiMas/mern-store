import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {fetchTags, removeTag, TTagAPI, updateTag} from "../../http/tagAPI";
import {TDocs} from "../../types/serverData";
import {Container, Row} from "react-bootstrap";
import * as yup from 'yup'
import {FormikValues} from 'formik';
import {ADMIN_ROUTE, CRUD_TAGS} from "../../utils/consts"
import CrudForm from "../../components/CrudForm"

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  slug: yup.string().required().min(3),
  tagTypeId: yup.string().required()
})

export type TTagPage = {
  title: string | undefined,
  slug: string | undefined,
  tagTypeId: string | undefined
}

const TagPage = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const id = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [data, setData] = useState<TDocs>()
  const [initialValues, setInitialValues] = useState<TTagPage>({title: '', slug: '', tagTypeId: ''})

  useMemo(() => {
    if (data) {
      setInitialValues({
        title: String(data.title),
        slug: String(data.slug),
        tagTypeId: String(data.tagTypeId)
      })
    }
  }, [data])

  useEffect(() => {
    fetchTags(`_id=${id}`).then(data => setData(data.docs[0]))
  }, [])


  const updateHandler = (items: FormikValues) => {
    updateTag(id, items as TTagAPI).then((data => console.log(data)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_TAGS)
  }

  const removeHandler = () => {
    removeTag(id).then((response => console.log(response)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_TAGS)
  }

  return (
    <Container>
      <Row>
        <h1>Tag</h1>
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

export default TagPage;
