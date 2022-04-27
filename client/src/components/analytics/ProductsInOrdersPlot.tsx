import {Data} from 'plotly.js';
import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import { useResizeDetector } from 'react-resize-detector';
import {fetchProducts} from "../../http/productAPI"
import {TProductItems} from "../../types/serverData"

export type TDataForPlot = {
  x: string[],
  y: number[],
  heightPlot?: number
}

const ProductsInOrdersPlot = ({x, y, heightPlot}: React.PropsWithChildren<TDataForPlot>) => {
  const [sourceData, setSourceData] = useState<TDataForPlot>({x, y});
  const {width, height, ref} = useResizeDetector()

  useEffect(() => {
   fetchProducts(`/_id=${x.join(',')};pagination=false`).then(res =>
     setSourceData(prev =>
       ({...prev, x: prev.x.map(item => {
           const foundData = res.docs.find((el: TProductItems) => el._id === item);
           return foundData ? foundData.title : item
         })
       })
     )
   )
  }, [])

  const data = [
    {
      histfunc: "count",
      y: sourceData.y,
      x: sourceData.x,
      type: "histogram",
      name: "count"
    },
    {
      histfunc: "sum",
      y: sourceData.y,
      x: sourceData.x,
      type: "histogram",
      name: "sum (in $)"
    }
  ]

  const layout = {
    width,
    height: heightPlot || 600,
    title: 'Basic analytics by ordering products'
  }

  return (
    <div ref={ref}>
      <Plot
        data={data as Data[]}
        layout={layout}
      />
    </div>
  );
};

export default ProductsInOrdersPlot;
