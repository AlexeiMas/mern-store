import React, {FC, useMemo, useState} from 'react';
import {Form} from "react-bootstrap"
import {fetchTags} from "../http/tagAPI"
import {TResponseData} from "../types/serverData"

export type TTagSelect = {
  handleChange: (e: React.ChangeEvent<any>) => void,
  tagTypeId: string
  tagId: string,
  setTagId: React.Dispatch<string>
}

const TagSelect: FC<TTagSelect> = ({handleChange, tagTypeId, tagId, setTagId}) => {
  const [typeTags, setTypeTags] = useState<TResponseData>()

  useMemo(() => {
    fetchTags(`pagination=false;tagTypeId=${tagTypeId}`).then(data => {
      setTypeTags(data);
      (data.docs && data.docs.length !== 0) ? setTagId(data.docs[0]._id) : setTagId('')
    })
  }, [tagTypeId])

  const options = typeTags && typeTags.docs.map((item =>
      <option key={item._id} value={item._id}>{item.title}</option>
  ))

  return (
    <Form.Select
      name="tagIdsList"
      onChange={handleChange}
      value={tagId}
    >
      <option disabled>Choose some tag</option>
      {(tagTypeId === '' || tagId === '') && <option value={''} disabled>-------</option>}
      {options}
    </Form.Select>
  );
};

export default TagSelect;
