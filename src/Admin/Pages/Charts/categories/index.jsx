 
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import useGetData from '../../../../Custom Hooks/UseGetData';
const CategoriesPie = () => {
  const {data:products,loading} = useGetData("products")
  const [allCategories, setAllCategories] = useState([]);
  const [count, setCount] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({});
 
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels:[],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  });
 
  useEffect(() => {
    if (products) {
      const categories = [...new Set(products?.map(product => product.category))];
      setAllCategories(categories);
      
      const categorizedProducts = categories.reduce((arr, category) => {
        arr[category] = products.filter(product => product.category === category);
        return arr;
      }, {});
      setFilteredProducts(categorizedProducts);
      const countt=[]
      Object.keys(filteredProducts).map((category)=>{
        countt.push(filteredProducts[category].length)
        setCount(countt)
      })
      setChartData(prevState => ({
        ...prevState,
        series: count,
        options: {
          ...prevState.options,
          labels: allCategories
        }
      }));
    }else{
        
    }
  },[chartData]);
 

 
 
  return (
    <div>
        <ReactApexChart options={chartData.options} series={chartData.series} width={'100%'} height={'250px'} type="pie"  />
    </div>
  );
};
export default CategoriesPie