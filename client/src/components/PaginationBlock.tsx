import React, {FC, useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";
import {TResponseDataWithArrays, TServerData} from "../types/serverData";
import {TCheckerStateItem} from "../types/checkerFiltration";
import NoMatch from "./NoMatch";

export type TPaginationBlock = {
  data: TServerData | TResponseDataWithArrays,
  setDocsListCount: React.Dispatch<number>,
  checkedFilters: TCheckerStateItem,
  setCheckedFilters: React.Dispatch<TCheckerStateItem>
}

const PaginationBlock: FC<TPaginationBlock> = ({data, setDocsListCount, checkedFilters, setCheckedFilters}) => {
  const [pagination, setPagination] = useState<React.ReactElement[]>([])

  const paginationCreator = () => {
    if (data) {
      let active = data.page
      const items = []

      for (let number = 1; number <= data.totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            style={{cursor: "default"}}
            onClick={() => {
              if (number !== active) {
                (number === 1 || active > data.totalPages)
                  ? setCheckedFilters({...checkedFilters, page: []})
                  : setCheckedFilters({...checkedFilters, page: [String(number)]})
              }
            }
            }
          >
            {number}
          </Pagination.Item>
        )
      }
      setPagination(items)
    }
  }

  useEffect(() => {
    paginationCreator()
    data && setDocsListCount(data.docs.length)
  }, [data])

  return (
    <>
      {
        data.totalPages > 1
          ? <Pagination style={{marginLeft: '.75rem'}}>{pagination}</Pagination>
          : data.docs.length < 1 && <NoMatch/>
      }
    </>
  );
};

export default PaginationBlock;
