import React, { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react"; // Import ECharts for React
import { Card, Form } from "react-bootstrap";
import WaterfallData from "../json/waterfallChart.json";

const WaterfallChart: React.FC = () => {
	const data = WaterfallData;
	const [showSplitLine, setSplitLine] = useState<boolean>(false);
	const [showWaterfallData, setShowWaterfallData] = useState<boolean>(true); // State to toggle data visibility

	// Prepare data for the waterfall chart
	const waterfallData = useMemo(() => {
		// Randomly pick 3 transactions and map their Revenue, Cost, and Profit values
		const randomTransactions = Array.from({ length: 3 }, () =>
			Math.floor(Math.random() * 50)
		);

		const selectedData = randomTransactions.flatMap((index) => [
			{ name: `Transaction ${index + 1} Revenue`, value: data[index].revenue },
			{ name: `Transaction ${index + 1} Cost`, value: -data[index].cost },
			{ name: `Transaction ${index + 1} Profit`, value: data[index].profit },
		]);

		return [{ name: "Start", value: 0 }, ...selectedData];
	}, [data]);

	// Define chart options
	const option = {
		title: {
			text: "Waterfall Chart: Revenue, Cost, and Profit",
			left: "center",
		},
		tooltip: {
			trigger: "item",
			axisPointer: {
				type: "shadow",
			},
			formatter: (params: any) => {
				// Display data based on the `showWaterfallData` state
				return showWaterfallData
					? `${params.name}: ${params.value}`
					: `${params.name}`;
			},
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "10%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			data: waterfallData.map((item) => item.name),
			name: "Transaction Stage",
			nameLocation: "middle",
			nameGap: 30,
			splitLine: { show: showSplitLine },
			axisLine: {
				show: false, // Hide the X-axis line
			},
		},
		yAxis: {
			type: "value",
			name: "Amount",
		},
		series: [
			{
				data: waterfallData.map((item) => item.value),
				type: "bar",
				barWidth: 40,
				itemStyle: {
					itemStyle: {
						borderColor: "transparent",
					},
					color: (params: { dataIndex: number }) => {
						if (params.dataIndex) {
							return "#13B898";
						}
					},
				},
			},
		],
	};

	const toggleSplitLine = () => {
		setSplitLine((prev: any) => !prev);
	};

	const toggleWaterfallData = () => {
		setShowWaterfallData((prev) => !prev);
	};

	return (
		<div className="w-100">
			<Card className="my-5 d-flex align-items-start" body>
				<Form.Check
					checked={showSplitLine}
					label="Show Splitline"
					className="d-inline-block"
					id="showSplitLine"
					onClick={toggleSplitLine}
				/>
				<Form.Check
					checked={showWaterfallData}
					label="Show value in tooltip"
					className="d-inline-block ms-3"
					id="showWaterfallData"
					onClick={toggleWaterfallData} // Toggle the waterfall data visibility
				/>
			</Card>
			<div className="chart-wrapper">
				<ReactECharts option={option} />
			</div>
		</div>
	);
};

export default WaterfallChart;
