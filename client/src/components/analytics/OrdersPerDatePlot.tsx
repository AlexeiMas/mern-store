import {Data} from 'plotly.js';
import React from 'react';
import Plot from 'react-plotly.js';
import {useResizeDetector} from 'react-resize-detector';
import {TDataForPlot} from "./ProductsInOrdersPlot";

const OrdersPerDatePlot = ({x, y}: React.PropsWithChildren<TDataForPlot>) => {
  const {width, height, ref} = useResizeDetector()

  const data = [ {x, y, type: 'scatter'} ]

  const layout = {
    width,
    height: 600,
    title: 'Count orders per day'
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

export default OrdersPerDatePlot;
