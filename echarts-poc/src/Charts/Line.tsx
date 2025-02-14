import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react'; // Import ECharts for React
import stockData from '../json/lineChart.json';
import { Card, Form } from 'react-bootstrap';

export const LineChart = () => {
  const [smoothLine, setSmoothLine] = useState<boolean>(false);

  const stockSymbols = stockData.map((stock) => stock.stock_symbol);
  const stockPrices = stockData.map((stock) => stock.stock_price);
  // const stockVolumes = stockData.map((stock) => stock.stock_volume);

  const toggleSmoothLine = () => {
    setSmoothLine(!smoothLine);
  };

  const option = {
    title: {
      text: 'Simple Bar Chart',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Price', 'Volume'],
    },
    xAxis: {
      type: 'category',
      data: stockSymbols,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: stockPrices,
        type: 'line',
        itemStyle: {
          color: '#13B898',
        },
        smooth: smoothLine, // added for smooth line
      },
    ],
  };

  return (
    <div>
      <Card className='my-5 d-flex align-items-start' body>
        <Form.Check
          checked={smoothLine}
          label='Smooth Line'
          className='d-inline-block'
          id='smoothLine'
          onClick={toggleSmoothLine}
        />
      </Card>
      <div className="chart-wrapper">
        <ReactECharts option={option} />
      </div>
    </div>
  );
};
