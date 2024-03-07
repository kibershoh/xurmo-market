import React, { useState, useRef, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import styles from './styles.module.scss'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const OrderChart = () => {
    const [chart, setChart] = useState(null);

    const toggleDataSeries = (e) => {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    const options = {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        
        title: {
            text: "Energy usage for Air Conditioning",
            fontSize:15
        },
        axisY: {
            title: "Energy (in terawatt hours)",
            fontSize:15
        },
        toolTip: {
            shared: true
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true,
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [
            {
                type: "stackedArea",
                name: "Tashkent",
                showInLegend: true,
                xValueFormatString: "YYYY",
                dataPoints: [
                    { x: new Date(1990, 0), y: 339 },
                    { x: new Date(2000, 0), y: 448 },
                    { x: new Date(2010, 0), y: 588 },
                    { x: new Date(2016, 0), y: 616 }
                ]
            },
            {
                type: "stackedArea",
                name: "Fargona",
                showInLegend: true,
                xValueFormatString: "YYYY",
                dataPoints: [
                    { x: new Date(1990, 0), y: 63 },
                    { x: new Date(2000, 0), y: 100 },
                    { x: new Date(2010, 0), y: 149 },
                    { x: new Date(2016, 0), y: 152 }
                ]
            },
            {
                type: "stackedArea",
                name: "Andijon",
                showInLegend: true,
                xValueFormatString: "YYYY",
                dataPoints: [
                    { x: new Date(1990, 0), y: 48 },
                    { x: new Date(2000, 0), y: 100 },
                    { x: new Date(2010, 0), y: 119 },
                    { x: new Date(2016, 0), y: 107 },
                ]
            },
            {
                type: "stackedArea",
                name: "Namangan",
                showInLegend: true,
                xValueFormatString: "YYYY",
                dataPoints: [
                    { x: new Date(1990, 0), y: 7 },
                    { x: new Date(2000, 0), y: 45 },
                    { x: new Date(2010, 0), y: 243 },
                    { x: new Date(2016, 0), y: 450 },
                ]
            },
            {
                type: "stackedArea",
                name: "Bukhara",
                showInLegend: true,
                xValueFormatString: "YYYY",
                dataPoints: [
                    { x: new Date(1990, 0), y: 6 },
                    { x: new Date(2000, 0), y: 22 },
                    { x: new Date(2010, 0), y: 49 },
                    { x: new Date(2016, 0), y: 91 },
                ]
            }
        ]
    };

    return (
        <div className={styles.order_chart}>
            <CanvasJSChart  options={options} onRef={ref => setChart(ref)} />
        </div>
    );
}

export default OrderChart;
