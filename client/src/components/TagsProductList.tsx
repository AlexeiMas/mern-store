import React, {FC, useEffect, useMemo, useState} from 'react';
import {fetchTags} from "../http/tagAPI"
import {TResponseData} from "../types/serverData"
import {Badge, Button, CloseButton, Col, Container, Form, Row} from "react-bootstrap"
import TagTypeSelect from "./TagTypeSelect"
import TagSelect from "./TagSelect"
import {FormikErrors, FormikValues} from "formik"

export type TTagsProductList = {
  tagsIds: string
  name: string
  values: FormikValues
  handleChange: (e: React.ChangeEvent<any>) => void
  errors: FormikErrors<FormikValues>
}

const TagsProductList: FC<TTagsProductList> = ({tagsIds, name, values, handleChange, errors}) => {
  const [ids, setIds] = useState<Array<string>>(tagsIds.split(','))
  const [tagsList, setTagsList] = useState<TResponseData>()
  const [tagTypeId, setTagTypeId] = useState<string>('')
  const [tagId, setTagId] = useState<string>('')

  useEffect(() => {
    fetchTags(`_id=${tagsIds};pagination=false`).then(data => setTagsList(data))
    setIds(tagsIds.split(','))
  }, [])

  useMemo(() => {
    fetchTags(`_id=${ids.join(',')};pagination=false`).then(data => setTagsList(data))
  }, [ids])

  console.log(values)

  const handleChangeType = (e: React.ChangeEvent<any>) => {
    setTagTypeId(e.target.value)
  }

  const handleChangeTag = (e: React.ChangeEvent<any>) => {
    setTagId(e.target.value)
  }

  const onAddTagHandler = () => {
    setIds([...ids, tagId])
  }

  const onDelTagHandler = (id: string) => {
    setIds(ids.filter(item => item !== id))
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label className="text-capitalize">{name}</Form.Label>
      <Form.Control
        name={name}
        aria-autocomplete="none"
        value={values[name] = JSON.stringify(ids)}
        onChange={handleChange}
        required
        type="hidden"
      />
      <div className="p-2 rounded" style={{border: '1px solid #ced4da'}}>
        {tagsList && tagsList.docs.map((item) =>
          <Badge bg={'secondary'} key={item._id} className="mx-1">
            <span>{item.slug}</span>
            <CloseButton variant="white" onClick={() => onDelTagHandler(item._id)}/>
          </Badge>
        )}
      </div>
      <Container className="mt-4">
        <Row className="d-flex justify-content-center align-items-end">
          <Col md={4}>
            <Form.Label className="text-capitalize">Type tag</Form.Label>
            <TagTypeSelect handleChange={handleChangeType} id={tagTypeId}/>
          </Col>
          <Col md={4}>
            <Form.Label className="text-capitalize">Tag</Form.Label>
            <TagSelect handleChange={handleChangeTag} tagTypeId={tagTypeId} tagId={tagId} setTagId={setTagId}/>
          </Col>
          <Col md={2}>
            <Button
              variant="success"
              disabled={tagTypeId === '' || tagId === ''}
              onClick={() => onAddTagHandler()}
            >Add new tag</Button>
          </Col>
        </Row>
      </Container>

      <Form.Control.Feedback type={"invalid"}>{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TagsProductList;
