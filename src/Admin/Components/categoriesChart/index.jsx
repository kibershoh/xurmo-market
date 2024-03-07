import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import styles from './styles.module.scss'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CategoriesChart() {
	const options = {
		exportEnabled: true,
		animationEnabled: true,
		title: {
			fontWeight:500,
            
			text: "Across all categories",
            fontSize:15,
		},
		data: [{
			type: "pie",
			startAngle: 80,
			toolTipContent: "<b>{label}</b>: {y}%",
			showInLegend: true,
			legendText: "{label}",
			indexLabelFontSize: 16,
			indexLabel: "{label} - {y}%",
			dataPoints: [
				{ y: 18, label: "Mobile" },
				{ y: 49, label: "Wireless" },
				{ y: 9, label: "Micraphones" },
				{ y: 5, label: "Mouses" },
				{ y: 19, label: "Watch" }
			]
		}]
	};

	return (
		<div className={styles.chart}>
			<CanvasJSChart options={options} />
		</div>
	);
}

export default CategoriesChart;
