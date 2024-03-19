import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useGetData from '../../../../Custom Hooks/UseGetData';
import { data } from '../../../Components/LineChart';

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3', '#FF34B3','#FF34B3'];

const AdminsProduct = () => {
    const [series, setSeries] = useState([{ data: [21, 22, 10, 28, 16, 21, 13, 30,3] }]);
    const { data: orders } = useGetData("orders")
    const [date, setDate] = useState([])

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'bar',
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                },
            },
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        xaxis: {
            categories: date,
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px',
                },
            },
        },
    });
    const formatDate = (n) => {
        return n < 10 ? '0' + n : n
    }
    const time = (date) => {
        const day = `${formatDate(date.toDate().getDate())}.${formatDate(date.toDate().getMonth() + 1)}.${formatDate(date.toDate().getFullYear())}`
        return day
    }
   
    useEffect(() => {
          const newDate = [];
        let datee
        orders.map(item => {
          datee = item.date
            newDate.push(time(datee));
        });
        setDate(newDate);
        
        setOptions(prevOptions => ({
            ...prevOptions,
            xaxis: {
                ...prevOptions.xaxis,
                categories: date,
            },
        }));
    }, [date]);
    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default AdminsProduct;
