import React from 'react'
import { Header, Services, Timer } from '../../Components'
import styles from './styles.module.scss'
import { ProductList } from '../../UI_Design'
import useGetData from '../../Custom Hooks/UseGetData'
import CardLoader from '../../Constants/LoaderCard'
const Home = () => {

  const { data: products, loading } = useGetData("products")

  const categorizedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
  const toUppercase = (text) => {
    const Text = text.charAt(0).toUpperCase() + text.slice(1)
    return Text;
  }
  return (
    <>
      <Header />
    <div
      className={styles.home}>
      <Services />
      {
        loading ? <CardLoader /> :
        <>
        {Object.keys(categorizedProducts).map(category => (
        <div key={category}>
          <h1 className={styles.product_name}>{toUppercase(category)}</h1>
          <ProductList data={categorizedProducts[category]} />
        </div>
      ))}
        </>
      }
      


    </div>
    </>
  )
}

export default Home