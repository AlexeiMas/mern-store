import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Form, Spinner} from "react-bootstrap";
import {TServerData} from "../types/serverData";
import {fetchTagTypes} from "../http/tagTypeAPI";
import {fetchTags} from '../http/tagAPI';
import {useLocation, useNavigate} from "react-router-dom";
import {ProductDispatchContext, ProductStateContext} from "../context/ProductContext"
import {fetchProducts} from "../http/productAPI";
import {PRODUCTS_ROUTE} from "../utils/consts";

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
    const {pathname} = useLocation()
    const [tagTypes, setTagTypes] = useState<TServerData>()
    const [tags, setTags] = useState<TServerData>()
    const [products, setProducts] = useState<TServerData>()
    const checkedFilters = useContext(ProductStateContext)
    const setCheckedFilters = useContext(ProductDispatchContext)

    useEffect(() => {
        let pathnameFilter;
        if (pathname.includes('catalog')) {
            pathnameFilter = pathname.split('catalog')[1]
        }
        fetchTagTypes('pagination=false').then(data => setTagTypes(data))
        fetchTags('pagination=false').then(data => setTags(data))

        //TODO: fix error in line above
        fetchProducts(`${pathnameFilter}${pathname === PRODUCTS_ROUTE ? 'pagination=false' : ';pagination=false'}`).then(data => setProducts(data))
    }, [pathname])

    useEffect(() => {
        // console.log('PRODUCTS_ROUTE + encodeToUrlQueriesFormat(checkedFilters) in TagTypeBar')
        // console.log(PRODUCTS_ROUTE + encodeToUrlQueriesFormat(checkedFilters))
        // console.log('checkedFilters in TagTypeBar')
        // console.log(checkedFilters)
        // console.log('encodeToUrlQueriesFormat(checkedFilters)')
        // console.log(encodeToUrlQueriesFormat(checkedFilters))
        // encodeToUrlQueriesFormat(checkedFilters) !== '' ? navigate(PRODUCTS_ROUTE + '/' + encodeToUrlQueriesFormat(checkedFilters)) : navigate(PRODUCTS_ROUTE)
        encodeToUrlQueriesFormat(checkedFilters) !== '' ? navigate(PRODUCTS_ROUTE + '/' + encodeToUrlQueriesFormat(checkedFilters)) : navigate(PRODUCTS_ROUTE)
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
    console.log(tagTypes, 'tagTypes')
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
