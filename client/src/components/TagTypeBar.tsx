import React, {FC, useEffect, useState} from 'react';
import {Accordion, Form, Spinner} from "react-bootstrap";
import {TServerData} from "../types/serverData";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchTagTypes} from "../http/tagTypeAPI";
import {fetchTags} from '../http/tagAPI';
import {encodeToUrlQueriesFormat} from "../utils/helperFunctions"
import {TShopFiltration} from "../types/checkerFiltration"

const TagTypeBar: FC<Omit<TShopFiltration, "setProductsCount">> = ({checkedFilters, setCheckedFilters, fetchDataCB, routeSlug, routeConst}) => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [tagTypes, setTagTypes] = useState<TServerData>()
  const [tags, setTags] = useState<TServerData>()
  const [products, setProducts] = useState<TServerData>()

  useEffect(() => {
    let pathnameFilter = '';

    if (pathname.includes(routeSlug)) {
      pathnameFilter = pathname.split(routeSlug)[1]
    }

    fetchTagTypes('pagination=false').then(data => setTagTypes(data))
    fetchTags('pagination=false').then(data => setTags(data))

    fetchDataCB(`${pathnameFilter}${pathname === String(routeConst) ? '/pagination=false' : ';pagination=false'}`).then(data => setProducts(data))
  }, [pathname])

  useEffect(() => {
    encodeToUrlQueriesFormat(checkedFilters) !== '' ? navigate(routeConst + '/' + encodeToUrlQueriesFormat(checkedFilters)) : navigate(routeConst)
  }, [checkedFilters])

  const tagIds = products && products.docs.map(item => item.tagsIds).flat(Infinity)
  const typeTagIds = tags && tags.docs.map(item => item.tagTypeId).flat(Infinity)

  const uniqueTagIds = tagIds && Object.values(tagIds.reduce((acc: { [key: string]: string }, item: any) => {
    acc[item] = item
    return acc;
  }, {}))
  const uniqueTypeIds = typeTagIds && Object.values(typeTagIds.reduce((acc: { [key: string]: string }, item: any) => {
    acc[item] = item
    return acc;
  }, {}))

  useEffect(() => {
    if (tags) {
      setTags({...tags, docs: tags.docs.filter(item => uniqueTagIds?.includes(item['_id']))})
    }
  }, [products])

  useEffect(() => {
    if (tagTypes) {
      setTagTypes({...tagTypes, docs: tagTypes.docs.filter(item => uniqueTypeIds?.includes(item['_id']))})
    }
  }, [tags])

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
                      })) : setCheckedFilters({
                        ...checkedFilters,
                        [key]: [...checkedFilters[key], value]
                      }))
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
