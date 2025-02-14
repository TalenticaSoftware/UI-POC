import React, { useState } from "react";
import ReactECharts from "echarts-for-react"; // Import ECharts for React
import { Card, Form } from "react-bootstrap";
import pieData from "../json/pieData.json";

export const PieChart = () => {
	const data = pieData;
	const [showLegend, setShowLegend] = useState<boolean>(true);
	const [showLabelLine, setShowLabelLine] = useState<boolean>(false);
	const [showRoundedCorners, setShowRoundedCorners] = useState<boolean>(false);
	const [isDonut, setIsDonut] = useState<boolean>(false);

	// Group by age group and count the occurrences
	const ageGroupCount = data.reduce((acc: { [key: string]: number }, curr) => {
		const ageGroup = curr.age_group;
		acc[ageGroup] = acc[ageGroup] ? acc[ageGroup] + 1 : 1;
		return acc;
	}, {});

	const ageGroups = Object.keys(ageGroupCount);
	const counts = ageGroups.map((group) => ageGroupCount[group]);

	// Define chart options for Pie chart
	const option = {
		title: {
			text: "Age Group Distribution",
			subtext: "Based on the provided dataset",
			left: "center",
			top: "top",
			textStyle: {
				fontSize: 24,
				fontWeight: "bold",
				color: "#333",
				fontFamily: "Montserrat, sans-serif",
			},
		},
		tooltip: {
			trigger: "item",
			formatter: "{b}: {c} ({d}%)",
		},
		legend: {
			show: showLegend,
			orient: "vertical",
			left: "left",
			top: "middle",
		},
		series: [
			{
				type: "pie",
				radius: isDonut ? ["30%", "50%"] : "50%",
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: showRoundedCorners ? 6 : 0,
					borderColor: "#fff",
					borderWidth: showRoundedCorners ? 2 : 0,
				},
				data: ageGroups.map((group, index) => ({
					name: group,
					value: counts[index],
				})),
				label: {
					show: showLabelLine,
					formatter: "{b}: {c} ({d}%)",
					color: "#333",
				},
				labelLine: {
					show: showLabelLine,
				},
			},
		],
	};

	// Toggle legend visibility
	const toggleLegend = () => {
		setShowLegend((prev) => !prev);
	};

	const showLabelLineToggle = () => {
		setShowLabelLine((prev) => !prev);
	};

	// Toggle between Pie and Donut chart
	const toggleChartType = () => {
		setIsDonut((prev) => !prev); // Toggle between Pie and Donut
	};

	const toggleRoundedCorners = () => {
		setShowRoundedCorners((prev) => !prev);
	};

	return (
		<div>
			<Card className="my-5 d-flex align-items-start" body>
				<Form.Check
					checked={showLegend}
					label="Show Legend"
					className="d-inline-block"
					id="legendCheckbox"
					onClick={toggleLegend}
				/>
				<Form.Check
					checked={showLabelLine}
					label="Show Label Line"
					className="d-inline-block mx-3"
					id="LabelLineCheckbox"
					onClick={showLabelLineToggle}
				/>
				<Form.Check
					checked={showRoundedCorners}
					label="Show Rounded Corners"
					className="d-inline-block mx-3"
					id="roundedCornersCheckbox"
					onClick={toggleRoundedCorners}
				/>
				<Form.Check
					checked={isDonut}
					label="Switch to Donut Chart"
					className="d-inline-block"
					id="donutChartCheckbox"
					onClick={toggleChartType}
				/>
			</Card>
			<div className="chart-wrapper">
				<ReactECharts option={option} />
			</div>
		</div>
	);
};

export default PieChart;
