import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Form, Spinner} from "react-bootstrap";
import {TServerData} from "../types/serverData";
import {fetchTagTypes} from "../http/tagTypeAPI";
import {fetchTags} from '../http/tagAPI';
import {useNavigate} from "react-router-dom";
import {ProductDispatchContext, ProductStateContext} from "../context/ProductContext"

export type TCheckerStateItem = { [key: string]: Array<string> }

const encodeToUrlQueriesFormat = (data: TCheckerStateItem): string => {
  return Object
    .entries(data)
    .map(item => item.join('='))
    .filter(item2 => item2[item2.length - 1] !== '=')
    .join(';')
}

const TagTypeBar = () => {
  const navigate = useNavigate()
  const [tagTypes, setTagTypes] = useState<TServerData>()
  const [tags, setTags] = useState<TServerData>()
  const checkedFilters = useContext(ProductStateContext)
  const setCheckedFilters = useContext(ProductDispatchContext)

  useEffect(() => {
    fetchTagTypes().then(data => setTagTypes(data))
    fetchTags().then(data => setTags(data))
  }, [])

  useEffect(() => {
    navigate('/' + encodeToUrlQueriesFormat(checkedFilters))
  }, [checkedFilters])

  return (
    <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
      {tagTypes && tagTypes.docs.map((tagType, i) =>
        <Accordion.Item eventKey={String(i)} key={tagType._id}>
          <Accordion.Header>
            <div className="text-capitalize">
              {tagType.title}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {tags
              ?
              tags.docs.map(tag => (tag.tagTypeId === tagType._id &&
                <Form.Check
                  type="checkbox"
                  id={String(tag._id)}
                  name={String(tag.slug)}
                  label={tag.title}
                  key={tag._id}
                  checked={!!checkedFilters[String(tagType.slug)] && checkedFilters[String(tagType.slug)].includes(String(tag.slug))}
                  onChange={(e) => {
                    const key = String(tagType.slug)
                    const value = String(tag.slug)
                    e.target.checked
                      ? (!checkedFilters[key] ? (Object.defineProperty(checkedFilters, key, {
                        value: []
                      }) && setCheckedFilters({
                        ...checkedFilters,
                        [key]: [...checkedFilters[key], value]
                      })) : setCheckedFilters({...checkedFilters, [key]: [...checkedFilters[key], value]}))
                      :
                      (setCheckedFilters({
                        ...checkedFilters,
                        [key]: checkedFilters[key].filter(item => item !== value)
                      }))
                  }}
                />
              ))
              :
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
          </Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  );
};

export default TagTypeBar;
