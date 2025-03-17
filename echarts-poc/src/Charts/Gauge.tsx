import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react"; // Import ECharts for React

export const Gauge = () => {
	const [gaugeValue, setGaugeValue] = useState<number>(50); // Dynamic gauge value

	// Simulate real-time data for the gauge
	useEffect(() => {
		const interval = setInterval(() => {
			// Simulate changing gauge value between 0 and 100
			setGaugeValue(Math.floor(Math.random() * 101));
		}, 1000); // Update every second

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, []);

	const gaugeOption = {
		series: [
			{
				type: "gauge",
				progress: {
					show: true,
					width: 10,
				},
				axisLine: {
					lineStyle: {
						width: 10,
					},
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					length: 6,
					lineStyle: {
						width: 2,
						color: "#999",
					},
				},
				axisLabel: {
					distance: 25,
					color: "#999",
					fontSize: 14,
				},
				anchor: {
					show: true,
					showAbove: true,
					size: 10,
					itemStyle: {
						borderWidth: 4,
					},
				},
				title: {
					show: false,
				},
				detail: {
					valueAnimation: true,
					fontSize: 18,
					offsetCenter: [0, "100%"],
					formatter: "{value} km/h",
				},
				data: [
					{
						value: gaugeValue, // dynamic value from state
						name: "Speed",
					},
				],
			},
		],
	};

	return (
		<div className="chart-wrapper">
			<ReactECharts option={gaugeOption} />
		</div>
	);
};
