import React, {FC, useEffect, useState} from 'react';
import {Form} from "react-bootstrap"
import {fetchTagTypes} from "../http/tagTypeAPI"
import {TResponseData} from "../types/serverData"

export type TTagTypeSelect = {
  handleChange: (e: React.ChangeEvent<any>) => void,
  id: string
}

const TagTypeSelect: FC<TTagTypeSelect> = ({id, handleChange}) => {
  const [typeTags, setTypeTags] = useState<TResponseData>()

  useEffect(() => {
    fetchTagTypes('pagination=false').then(data => setTypeTags(data))
  }, [])

  const options = typeTags && typeTags.docs.map((item =>
      <option key={item._id} value={item._id}>{item.title}</option>
  ))

  return (
    <Form.Select
      name="tagTypeId"
      onChange={handleChange}
      value={id}
    >
      <option value={''} disabled>Choose some type</option>
      {options}
    </Form.Select>
  );
};

export default TagTypeSelect;
