import React, {useEffect, useMemo, useState} from 'react';
import {Container, Row, Spinner} from "react-bootstrap";
import jwt_decode from "jwt-decode"
import {getTokenItem, removeStorageItem} from "../utils/storageFunctions"
import {toEqualsLen} from "../utils/helperFunctions"
import {useNavigate} from "react-router-dom"
import {RoutesConst} from "../utils/consts"
import {fetchUsers, removeUser, TUserAPI, updateUser} from "../http/userAPI"
import {TDocs} from "../types/serverData"
import CrudForm from "../components/CrudForm"
import * as yup from "yup"
import {TUserPage} from "./cruds/UserPage"
import {FormikValues} from "formik"
import AdminAlert from "../components/notifications/AdminAlert"
import AdminConfirm from "../components/notifications/AdminConfirm"

const schema = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(3)
})

export type TDecodedToken = {
  adminId: string
  exp: number
  iat: number
}

const Settings = () => {
  const [data, setData] = useState<TDocs>()
  const [initialValues, setInitialValues] = useState<TUserPage>({name: '', email: '', password: ''})
  const [isExpired, setExpired] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showFault, setShowFault] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const navigate = useNavigate()
  const token = getTokenItem('token')?.split(' ')[1]
  const decodedToken: TDecodedToken | undefined = (token && jwt_decode(token)) || undefined
  const dateNow = new Date()

  if (token && decodedToken) {
    const normalizeLen = toEqualsLen([decodedToken.exp, dateNow.getTime()]);
    (normalizeLen[0] < normalizeLen[1]) && setExpired(true)
  }

  useMemo(() => {
    if (isExpired) {
      removeStorageItem('token');
      navigate(RoutesConst.LOGIN_ROUTE)
    }
  }, [isExpired])

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
    if (decodedToken)
      fetchUsers(`_id=${decodedToken["adminId"]}`).then(data => setData(data.docs[0]))
  }, [])

  const updateHandler = (items: FormikValues) => {
    if (decodedToken)
      updateUser(decodedToken["adminId"], items as TUserAPI).then((data => setShowSuccess(true)), (reason => setShowFault(true)))
  }

  const removeHandler = () => {
    setShowConfirm(true)
  }

  useMemo(() => {
    if (confirmed && decodedToken) {
      removeUser(decodedToken["adminId"]).then((response => {
        removeStorageItem('token')
        navigate(RoutesConst.LOGIN_ROUTE)
      }), (reason => console.error(reason)))
    }
  }, [confirmed])

  return (
    <Container>
      <Row>
        <h1>Settings</h1>
      </Row>
      <Row className="position-relative">
        <AdminAlert title="User's data were successfully updated" show={showSuccess} setShow={setShowSuccess}/>
        <AdminAlert title="The changes weren't saved" show={showFault} setShow={setShowFault} variant={"danger"}
                    message={"Something went wrong. Maybe, you didn't change password. It's necessary!"}/>
        <AdminConfirm title="Confirm removing of user"
                      show={showConfirm}
                      setShow={setShowConfirm}
                      confirmed={setConfirmed}
                      message={"You can't get access to admin dashboard, if you get an agreement. And it will be removed all your data immediately. Are you sure?"}
        />
        {
          data
            ?
            <CrudForm
              schema={schema}
              initialValues={initialValues}
              updateHandler={updateHandler}
              removeHandler={removeHandler}
            />
            :
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
      </Row>
    </Container>
  );
};

export default Settings;
