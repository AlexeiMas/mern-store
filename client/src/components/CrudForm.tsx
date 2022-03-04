import React, {FC, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap"
import * as yup from 'yup'
import {Formik, FormikValues} from "formik"
import TagTypeSelect from "./TagTypeSelect"
import TagsProductList from "./TagsProductList"

export type TCrudForm = {
  schema: yup.ObjectSchema<any>
  initialValues: { [key: string]: string | number | Array<any> | undefined }
  createHandler?: (items: FormikValues) => void
  updateHandler?: (items: FormikValues) => void
  removeHandler?: () => void
}

const CrudForm: FC<TCrudForm> = (
  {
    schema,
    initialValues,
    createHandler,
    updateHandler,
    removeHandler,
  }) => {
  //TODO Fix upload file
  const [imgFile, setImgFile] = useState<File | undefined>(undefined)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null | undefined>(undefined)
  // const [imagePreviewUrl, setImagePreviewUrl] = useState<string | number | string[] | undefined>(undefined)
  const nodes = Object.keys(initialValues)

  const typeForInput = (field: string): string => {
    switch (field) {
      case 'email':
        return 'email'
      case 'password':
        return 'password'
      case 'phone':
        return 'tel'
      case 'tel':
        return 'tel'
      case 'price':
        return 'number'
      case 'image':
        return 'file'
      default:
        return 'text'
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault()
    console.log(e.target.files)
    let reader = new FileReader()
    let file: File = ((e.target as HTMLInputElement).files as FileList)[0]
    console.log(file)
    if (file) {
      reader.onloadend = () => {
        setImgFile(file)
        setImagePreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // const getFileSchema = (file: File | null) => (file && {
  //   file: file,
  //   type: file.type,
  //   name: file.name
  // })

  // console.log(imgFile)

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={((values) => {
        createHandler && createHandler(values)
        updateHandler && updateHandler(values)
      })}
    >
      {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors
        }) => (
        <Form onSubmit={handleSubmit}>
          {nodes.map((item: string, i: number) => {
            if (item === 'image') {
              return (
                <Form.Group key={i} className="mb-3" controlId={item}>
                  <Form.Label className="text-capitalize">{item}</Form.Label>
                  {/*<FieldArray name={item}>*/}
                  {/*  {(arrayHelper) => (*/}
                  {/*    <Form.Control*/}
                  {/*      name={item}*/}
                  {/*      // value={values[item]}*/}
                  {/*      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {*/}
                  {/*        const {files} = event.target*/}
                  {/*        const file = files && getFileSchema(files.item(0))*/}
                  {/*        if (!file) {*/}
                  {/*          arrayHelper.remove(0)*/}
                  {/*        }*/}
                  {/*        if (Array.isArray(values[item])) {*/}
                  {/*          arrayHelper.replace(0, file)*/}
                  {/*        } else {*/}
                  {/*          arrayHelper.push(file)*/}
                  {/*        }*/}
                  {/*      }}*/}
                  {/*      // onChange={(e) => console.log(e.target.value)}*/}
                  {/*      onBlur={handleBlur}*/}
                  {/*      isValid={touched[item] && !errors[item]}*/}
                  {/*      isInvalid={touched[item] && !!errors[item]}*/}
                  {/*      required*/}
                  {/*      type={typeForInput(item)}*/}
                  {/*    />*/}
                  {/*  )}*/}
                  {/*</FieldArray>*/}

                  <Form.Control
                    name={item}
                    // value={values[item]}
                    onChange={handleImageChange}
                    // onChange={(e) => console.log(e.target.value)}
                    onBlur={handleBlur}
                    isValid={touched[item] && !errors[item]}
                    isInvalid={touched[item] && !!errors[item]}
                    required
                    type={typeForInput(item)}
                  />


                  {/*<Form.Control*/}
                  {/*  type="file"*/}
                  {/*  value={imagePreviewUrl}*/}
                  {/*  onChange={(e) => {*/}
                  {/*  setImagePreviewUrl(e.target.value);*/}
                  {/*  let file:File = ((e.target as HTMLInputElement).files as FileList)[0];*/}
                  {/*  setFile( file || null)*/}
                  {/*}}/>*/}
                  <Form.Control.Feedback type={"invalid"}>{errors[item]}</Form.Control.Feedback>
                </Form.Group>
              )
            }
              if (!item.toLowerCase().includes('id')) {
                return (
                  <Form.Group key={i} className="mb-3" controlId={item}>
                    <Form.Label className="text-capitalize">{item}</Form.Label>
                    <Form.Control
                      name={item}
                      as={item === "description" ? "textarea" : "input"}
                      readOnly={item === 'productItems'}
                      aria-autocomplete="none"
                      value={values[item]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched[item] && !errors[item]}
                      isInvalid={touched[item] && !!errors[item]}
                      required
                      type={typeForInput(item)}
                      placeholder={`Input ${item}`}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item]}</Form.Control.Feedback>
                  </Form.Group>
                )
              }
              if (item.toLowerCase() === 'TagTypeId'.toLowerCase()) {
                return (
                  <Form.Group key={i}>
                    <Form.Label className="text-capitalize">{item}</Form.Label>
                    <TagTypeSelect
                      handleChange={handleChange}
                      id={String(values[item])}
                    />
                    <Form.Control.Feedback type={"invalid"}>{errors[item]}</Form.Control.Feedback>
                  </Form.Group>
                )
              }
              if (item.toLowerCase() === 'tagsIds'.toLowerCase()) {
                return (
                  <TagsProductList
                    key={i}
                    tagsIds={String(values[item])}
                    name={item}
                    values={values}
                    handleChange={handleChange}
                    errors={errors}
                  />
                )
              }
            }
          )}
          <Row className="mt-4">
            <Col className="d-flex justify-content-end">
              <Button variant="success" type="submit" disabled={!isValid}>Save</Button>
              {removeHandler &&
              <Button variant="danger" className="ms-4" onClick={() => removeHandler()}>REMOVE</Button>}
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CrudForm;
