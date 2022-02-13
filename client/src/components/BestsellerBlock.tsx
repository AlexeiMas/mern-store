import React, {useEffect, useState} from 'react';
import {TServerData} from "../types/serverData"
import {fetchProducts} from "../http/productAPI"
import GoodsBlock from "./GoodsBlock"

const BestsellerBlock = () => {
  const [best, setBest] = useState<TServerData>()

  useEffect(() => {
    fetchProducts('/sort=orderCounter,-1').then(data => setBest(data))
  }, [])

  return (
    <GoodsBlock title="Best sellers" data={best} linkLabel="product"/>
  );
};

export default BestsellerBlock;
