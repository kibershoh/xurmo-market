import React from 'react';
import {
  Chart as ChartJS,
  
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  
};



export const data = {
  labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      // data: labels.map(() => Math.floor(Math.random() * 2000) - 1000),
     data:[3,4,6],
      backgroundColor: '#000',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 1',
      // data: labels.map(() => Math.floor(Math.random() * 2000) - 1000),
     data:[3,4,6],
      backgroundColor: '#888',
      stack: 'Stack 0',
    },
     {
      label: 'Dataset 1',
      // data: labels.map(() => Math.floor(Math.random() * 2000) - 1000),
     data:[3,4,6],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    
  ],
};

 const LineChart=()=> {
  return (
    <div>
      <Bar
   options={options} data={data} >

  </Bar>;
    </div>
  )
}
export default LineChart;
