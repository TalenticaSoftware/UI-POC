import React, { useState } from "react";
import ReactECharts from "echarts-for-react"; // Import ECharts for React
import BarData from "../json/barData.json";
import { Card, Form } from "react-bootstrap";

export const BarChart = () => {
	const data = BarData;
	const [showBackground, setShowBackground] = useState<boolean>(false);
	const [alignWithXAxis, setAlignWithXAxis] = useState<boolean>(false);
	const [differentBarColor, setDifferentBarColor] = useState<boolean>(true);
	const [showVisualMap, setShowVisualMap] = useState<boolean>(false);

	// Group cars by model year
	const carCountByYear = data.reduce((acc: { [key: number]: number }, curr) => {
		const year = curr.car_model_year;
		acc[year] = acc[year] ? acc[year] + 1 : 1;
		return acc;
	}, {});

	const years = Object.keys(carCountByYear)
		.map((year) => Number(year))
		.sort((a, b) => a - b);
	const carCounts = years.map((year) => carCountByYear[year]);

	// Define chart options
	const option = {
		title: {
			text: "Car Distribution by Model Year", // Main title text
			subtext: "Data from 2020 to 2025", // Optional subtitle
			left: "center", // Center the title horizontally
			top: "top", // Position the title at the top (default is 'top')
			textStyle: {
				fontSize: 24, // Font size of the main title
				fontWeight: "bold", // Font weight for the main title
				color: "#333", // Font color for the main title
				fontFamily: "Montserrat, sans-serif", // Custom font family
			},
			subtextStyle: {
				fontSize: 14, // Font size for the subtitle
				color: "#777", // Font color for the subtitle
				fontFamily: "Arial, sans-serif", // Custom font family for subtitle
			},
			padding: [10, 0, 10, 0], // Padding around the title (top, right, bottom, left)
		},
		tooltip: {
			trigger: "axis",
			// Custom tooltip formatter
			formatter: (params: any) => {
				// Retrieve the year and count of cars from the parameters
				const year = years[params[0].dataIndex];
				const carCount = carCounts[params[0].dataIndex];

				// Format tooltip text
				return `<div class="tooltip-header"><strong>Year: ${year}</strong></div>
						<div>Number of Cars: <span style="color: #FF5733;">${carCount}</span></div>`;
			},
		},
		xAxis: {
			type: "category",
			data: years,
			name: "Model Year",
			nameLocation: "middle",
			nameGap: 40,
			axisTick: {
				alignWithLabel: alignWithXAxis,
			},
			nameTextStyle: {
				align: "center", // Can be "center", "right", or "left"
				verticalAlign: "top", // Can be "top", "middle", or "bottom"
				fontFamily: "Montserrat, serif",
				fontSize: 14,
				fontWeight: "bold",
			},
		},
		yAxis: {
			type: "value",
			name: "Number of Cars",
			nameLocation: "middle", // Can also be "middle" or "end"
			nameTextStyle: {
				align: "center", // Can be "center", "right", or "left"
				verticalAlign: "top", // Can be "top", "middle", or "bottom"
				fontFamily: "Montserrat, serif",
				fontSize: 14,
				fontWeight: "bold",
			},
			// Use padding to shift the title
			nameGap: 50, // You can adjust the gap between the axis and title
			padding: [10, 0, 0, 20], // Example padding
		},
		...(showVisualMap === true && {
			visualMap: {
				orient: "horizontal",
				left: "center",
				bottom: "0px",
				min: Math.min(...carCounts),
				max: Math.max(...carCounts),
				text: ["High Count", "Low Count"],
				dimension: 1,
				// show: true, // Always show visualMap when enabled
				inRange: {
					color: ["#65B581", "#FFCE34", "#FD665F"],
				},
			},
		}),
		series: [
			{
				data: carCounts,
				type: "bar",
				barWidth: 20,
				showBackground: showBackground,
				itemStyle: {
					color: (params: { dataIndex: number }) => {
						if (params.dataIndex % 2 === 0 && differentBarColor) {
							//every even bar
							return "#FF5733";
						}
						return "#13B898";
					},
				},
				label: {
					show: true, // Display the label
					position: "inside", // Position it inside the bar
					// formatter: "{c}", // Display the value (c is the current data point)
					color: "#fff", // Text color (you can change this to something else)
				},
			},
		],
		grid: {
			bottom: 100,
			top: 100,
		},
	};

	// Toggle background on button click
	const toggleBackground = () => {
		setShowBackground((prev: any) => !prev);
	};

	const toggleXAxisAlignment = () => {
		setAlignWithXAxis((prev: any) => !prev);
	};

	const toggleDifferentBarColor = () => {
		setDifferentBarColor((prev: any) => !prev);
	};

	const toggleVisualMap = () => {
		setShowVisualMap((prev: any) => !prev);
	};

	return (
		<div>
			<Card className="my-5 d-flex align-items-start" body>
				<Form.Check
					checked={showBackground}
					label="Show Background"
					className="d-inline-block"
					id="backgroundCheckbox"
					onClick={toggleBackground}
				/>
				<Form.Check
					checked={alignWithXAxis}
					label="Align with X Axis"
					className="d-inline-block ms-4"
					id="xAxisCheckbox"
					onClick={toggleXAxisAlignment}
				/>
				<Form.Check
					checked={differentBarColor}
					label="Different Bar Color"
					className="d-inline-block mx-4"
					id="barColorCheckbox"
					onClick={toggleDifferentBarColor}
				/>
				<Form.Check
					checked={showVisualMap}
					label="Show Visual Map"
					className="d-inline-block"
					id="visualMapCheckbox"
					onClick={toggleVisualMap} // Toggle the visual map visibility
				/>
			</Card>
			<div className="chart-wrapper">
				<ReactECharts
					key={showVisualMap ? "withVisualMap" : "withoutVisualMap"}
					option={option}
				/>
			</div>
		</div>
	);
};

export default BarChart;
