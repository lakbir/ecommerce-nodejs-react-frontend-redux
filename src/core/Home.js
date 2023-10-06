import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { getProducts } from './ApiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
  const [productsBestSellers, setProductsBestSellers] = useState([]);
  const [productsArrivals, setProductsArrivals] = useState([]);

  const loadProductBestSellers = () => {
    getProducts({sortBy : 'sold', order : 'desc', limit : 6})
      .then(products => setProductsBestSellers(products))
      .catch(err => console.log(err))
  }

  const loadProductArrivals = () => {
    getProducts({sortBy : 'createdAt', order : 'desc', limi : 3})
      .then(products => setProductsArrivals(products))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadProductArrivals()
    loadProductBestSellers()
  },[]);

  return (
    <div>
      <Layout 
      title="Home Page" 
      description="Node React Ecommerce App" 
      className="container">
        <Search />
        <hr />
        <h1>Arrival Products</h1>
          <div class="row mt-3 mb-5">
              {productsArrivals.map((product,i) => (
                  <div className='col-md-4'>
                      <Card product={product} imgZise="335"></Card>
                  </div>
              ))}
          </div>
        
        <hr />
        <h1>Best Sellers Products</h1>
        <div class="row mt-3 mb-5">
              {productsBestSellers.map((product,i) => (
                  <div className='col-md-4'>
                      <Card product={product} imgZise="335"></Card>
                  </div>
              ))}
          </div>
      </Layout>
    </div>
  )
}

export default Home
