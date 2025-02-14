import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react"; // Import ECharts for React
import * as echarts from "echarts"; // Import echarts globally to access graphic methods
import stockData from "../json/lineChart.json"; // Assuming this is your initial data
import { Card, Form } from "react-bootstrap";

export const LineChart = () => {
	const [smoothLine, setSmoothLine] = useState<boolean>(false);
	const [stockSymbols] = useState<string[]>(
		stockData.map((stock) => stock.stock_symbol)
	);
	const [stockPrices, setStockPrices] = useState<number[]>(
		stockData.map((stock) => stock.stock_price)
	);

	// Toggle smooth line functionality
	const toggleSmoothLine = () => {
		setSmoothLine(!smoothLine);
	};

	// Simulate stock price updates with trends to change line structure
	useEffect(() => {
		const interval = setInterval(() => {
			setStockPrices((prevPrices) => {
				// Apply a trend: Either increasing or decreasing with some fluctuation
				return prevPrices.map((price, index) => {
					// Apply a random adjustment based on an upward or downward trend
					const trend = Math.random() * 20 - 2; // Value between -1 and 1
					const fluctuation = Math.random() * 1000 - 15; // Small fluctuation
					return price + trend * 3 + fluctuation;
				});
			});
		}, 1500); // Update every second

		return () => clearInterval(interval); // Cleanup on component unmount
	}, []);

	// ECharts options with dynamic stock data
	const option = {
		title: {
			text: "Stock Price Movement",
			left: "center",
		},
		tooltip: {
			trigger: "axis",
		},
		legend: {
			data: ["Price"],
		},
		xAxis: {
			type: "category",
			data: stockSymbols,
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: stockPrices,
				type: "line",
				itemStyle: {
					color: "#13B898", // Default color when no gradient is applied
				},
				lineStyle: {
					// Apply gradient line style here
					type: "solid", // The line type, you can change it to dashed if needed
					width: 3, // Line width
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						{ offset: 0, color: "#FFCE34" }, // Color at the start
						{ offset: 1, color: "#FD665F" }, // Color at the end
					]),
				},
				smooth: smoothLine, // smooth line based on user toggle
			},
		],
	};

	return (
		<div>
			<Card className="my-5 d-flex align-items-start" body>
				<Form.Check
					checked={smoothLine}
					label="Smooth Line"
					className="d-inline-block"
					id="smoothLine"
					onClick={toggleSmoothLine}
				/>
			</Card>
			<div className="chart-wrapper">
				<ReactECharts option={option} />
			</div>
		</div>
	);
};
