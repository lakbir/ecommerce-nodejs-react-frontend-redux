import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProduct, relatedProducts } from './ApiCore';
import Layout from './Layout';
import Card from './Card';

const Product = (props) => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);

    useEffect(() => {
        getOneProduct(id)
            .then(res => {
                setProduct(res)
                return relatedProducts(id)
            })
            .then(rel => setRelated(rel))
            .catch(err => console.error(err))
    },[props, related])
  return (
    <div>
        {product && product.description && (
    <Layout
        title={product.name}
        description={product.description.substring(0, 100)}
        className="container"
      >
            <div className='row'>
                <div className='col-md-9'>
                    <Card product={product} imgZise="800" showViewBtn={false}></Card>
                </div>
                <div className='col-md-3'>
                    {related && related.map((product, i) => (
                        <Card key={product._id} product={product} imgZise="240"></Card>
                    ))}
                </div>
            </div>
      </Layout>
      )}
    </div>
  )
}

export default Product
