import React, {useEffect, useState} from 'react';
import {fetchProducts} from "../http/productAPI"
import {TServerData} from "../types/serverData"
import GoodsBlock from "./GoodsBlock"

const NewArrivalsBlock = () => {
  const [newest, setNewest] = useState<TServerData>()

  useEffect(() => {
    fetchProducts('/sort=createdDate,-1').then(data => setNewest(data))
  }, [])

  return (
    <GoodsBlock title="New arrivals" data={newest} linkLabel="product"/>
  );
};

export default NewArrivalsBlock;
