import React, { useState } from "react";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import BarChart from "../Charts/Bar";
import { LineChart } from "../Charts/Line";
import WaterfallChart from "../Charts/Waterfall";
import StackedBarChart from "../Charts/StackedBar";
import { StackedLinesChart } from "../Charts/StackedLine";
import PieChart from "../Charts/Pie";

// Array of tab items with corresponding component names
const tabData = [
	{ eventKey: "tab1", label: "Bar", component: <BarChart /> },
	{
		eventKey: "tab2",
		label: "Stacked Bar",
		component: <StackedBarChart />,
	},
	{ eventKey: "tab3", label: "Line", component: <LineChart /> },
	{
		eventKey: "tab4",
		label: "Stacked Line",
		component: (
			<div className="py-5">
				<StackedLinesChart />
			</div>
		),
	},
	{ eventKey: "tab5", label: "Waterfall", component: <WaterfallChart /> },
	{ eventKey: "tab6", label: "Pie", component: <PieChart /> },
];

const VerticalTabs = () => {
	const [key, setKey] = useState<string>("tab1"); // Default active tab

	return (
		<Tab.Container defaultActiveKey={key}>
			<Row className="w-100 h-100">
				{/* Vertical Nav for Tab Items */}
				<Col sm={3} className="d-flex flex-column h-100 overflow-hidden">
					<Nav
						variant="pills"
						className="chart-nav flex-column h-100 overflow-auto"
						activeKey={key}
						onSelect={(k) => setKey(k || "")}>
						<Nav.Item className="d-flex justify-content-center py-3 text-white border-bottom border-light mb-3">
							<h4>Charts</h4>
						</Nav.Item>
						{tabData.map((tab) => (
							<Nav.Item key={tab.eventKey}>
								<Nav.Link eventKey={tab.eventKey}>{tab.label}</Nav.Link>
							</Nav.Item>
						))}
					</Nav>
				</Col>

				{/* Tab Content */}
				<Col sm={9} className="h-100 overflow-hidden">
					<Tab.Content className="h-100 overflow-auto">
						{tabData.map((tab) => (
							<Tab.Pane key={tab.eventKey} eventKey={tab.eventKey}>
								{tab.component}
							</Tab.Pane>
						))}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default VerticalTabs;
