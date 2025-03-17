import React from 'react';
import ReactECharts from 'echarts-for-react'; // Import ECharts for React
import stockData from '../json/lineChart.json';

export const StackedLinesChart = () => {
  // Take the first 10 entries from stockData
  const topStockData = stockData.slice(0, 10);

  // Extract stock symbols and prices for the top 10 stocks
  const stockSymbols = topStockData.map((stock) => stock.stock_symbol);
  const stockPrices = topStockData.map((stock) => stock.stock_price);

  // Define a custom color palette
  const customColors = [
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#F7CAC9',
    '#92A8D1',
    '#955251',
    '#B565A7',
    '#009B77',
    '#DD4124',
    '#D65076',
  ];

  // Generate series data for stacked line chart (top 10 entries)
  const series = topStockData.map((stock, index) => ({
    name: stock.stock_symbol,
    data: new Array(topStockData.length)
      .fill(0)
      .map((_, i) => (i <= index ? stockPrices[i] : 0)),
    type: 'line',
    stack: 'Total', // Important for stacking
    itemStyle: {
      // color: `hsl(${(index * 360) / topStockData.length}, 70%, 50%)`, // Dynamic color for each line
      itemStyle: {
        color: customColors[index], // Use custom color from the palette
      },
    },
  }));

  console.log('series', series);

  const option = {
    title: {
      text: 'Stacked Line Chart',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      // Custom tooltip formatter (optional)
      formatter: (params: any[]) => {
        let tooltipContent = '';
        params.forEach((param) => {
          tooltipContent += `
            <div style="font-weight: bold; color: ${param.color};">
              ${param.seriesName}: ${param.value}
            </div>
          `;
        });
        return tooltipContent;
      },
      // Tooltip style customization
      backgroundColor: '#fff', // Background color
      borderColor: '#ccc', // Border color
      borderWidth: 1, // Border width
      padding: [10], // Padding inside the tooltip
      textStyle: {
        color: '#333', // Tooltip text color
        fontSize: 12, // Tooltip font size
        fontFamily: 'Montserrat, serif', // Tooltip font family
      },
      // Custom tooltip width can be adjusted via the `formatter` content and `padding`
      extraCssText: 'max-width: 300px; word-wrap: break-word;', // Custom max-width for tooltip
    },
    legend: {
      data: stockSymbols,
      top: 40,
      left: 'center',
      orient: 'horizontal',
      textStyle: {
        color: '#333',
        fontSize: 14,
      },
      itemWidth: 20,
      itemHeight: 10,
      icon: 'circle',
      formatter: (name: any) => `${name} Stock`,
    },
    grid: {
      left: '8%',
      right: '4%',
      bottom: '5%',
      top: '35%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: stockSymbols,
      name: 'Stock Prices',
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        align: 'center',
        verticalAlign: 'top',
        fontFamily: 'Montserrat, serif',
        fontSize: 14,
        fontWeight: 'bold',
      },
      axisLabel: {
        rotate: 45,
        fontWeight: 'bold',
      },
    },
    yAxis: {
      type: 'value',
      name: 'Ticker Symbol',
      nameLocation: 'middle',
      nameTextStyle: {
        align: 'center',
        verticalAlign: 'top',
        fontFamily: 'Montserrat, serif',
        fontSize: 14,
        fontWeight: 'bold',
      },
      nameGap: 50,
      padding: [10, 0, 0, 20],
      axisLabel: {
        formatter: (value: number) =>
          value >= 1000 ? `${value / 1000}k` : value,
      },
    },
    series: series,
  };

  return (
    <div className="chart-wrapper stacked-line">
      <ReactECharts option={option} />
    </div>
  );
};
