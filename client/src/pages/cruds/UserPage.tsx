import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {fetchUsers, removeUser, TUserAPI, updateUser} from "../../http/userAPI";
import {TDocs} from "../../types/serverData";
import {Container, Row} from "react-bootstrap";
import * as yup from 'yup'
import {FormikValues} from 'formik';
import {ADMIN_ROUTE, CRUD_USERS} from "../../utils/consts"
import CrudForm from "../../components/CrudForm"

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(3)
})

export type TUserPage = {
  name: string | undefined,
  email: string | undefined,
  password: string | undefined
}

const UserPage = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const id = pathname.slice(pathname.lastIndexOf('/') + 1)
  const [data, setData] = useState<TDocs>()
  const [initialValues, setInitialValues] = useState<TUserPage>({name: '', email: '', password: ''})

  useMemo(() => {
    if (data) {
      setInitialValues({
        name: String(data.name),
        email: String(data.email),
        password: String(data.password)
      })
    }
  }, [data])

  useEffect(() => {
    fetchUsers(`_id=${id}`).then(data => setData(data.docs[0]))
  }, [])


  const updateHandler = (items: FormikValues) => {
    updateUser(id, items as TUserAPI).then((data => console.log(data)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_USERS)
  }

  const removeHandler = () => {
    removeUser(id).then((response => console.log(response)), (reason => console.error(reason)))
    navigate(ADMIN_ROUTE + CRUD_USERS)
  }

  return (
    <Container>
      <Row>
        <h1>User</h1>
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

export default UserPage;
