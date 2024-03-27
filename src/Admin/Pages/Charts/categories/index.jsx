
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import useGetData from '../../../../Custom Hooks/UseGetData';
import { PieChart } from '@mui/x-charts';
import { all } from 'axios';
const CategoriesPie = () => {
  const { data: products, loading } = useGetData("products")
  const [allCategories, setAllCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({});

  

  useEffect(() => {
    let categories = [...new Set(products?.map(product => product?.category))];
    setAllCategories(categories);

    let categorizedProducts = categories?.reduce((arr, category) => {
      arr[category] = products.filter(product => product.category === category);
      return arr;
    }, {});
    setFilteredProducts(categorizedProducts);

  }, [products]);

  useEffect(() => {
    let newData = []
    Object.keys(filteredProducts).map((category, index) => {

      newData.push({
        id: index,
        value: filteredProducts[category]?.length,
        label: category,
      })
    })

    setAllCategories(newData)
  }, [filteredProducts])
  console.log(allCategories);



  return (
    <div>
      <PieChart
        series={[
          {
            data: allCategories && allCategories,
          },
        ]}

        width={400}
        height={200}
      />
    </div>
  );
};
export default CategoriesPie