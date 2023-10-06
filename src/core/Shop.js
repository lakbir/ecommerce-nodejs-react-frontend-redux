import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { filterProducts, getCategories } from './ApiCore';
import FilterByCategory from './FilterByCategory';
import FilterByPrice from './FilterByPrice';
import Card from './Card';

const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [productsFiltred, setProductsFiltred] = useState([]);
    const [myFilters, setMyFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getCategories().then(res => setCategories(res)).catch(err => console.log('Error to get categories'));
        filterProducts(skip, limit, myFilters).then(res => {
            setProductsFiltred(res)
            setSkip(0)
            setSize(res.length)
        });
    }, [myFilters])

    const loadMore = () => {
        const toSkip = skip + limit;
        filterProducts(toSkip, limit, myFilters)
        .then(res => {
            setProductsFiltred([...productsFiltred, ...res])
            setSkip(toSkip)
            setSize(res.length)
        });
    }

    const buttonToLoeadMore = () => {
        return (
            size > 0 && size >= limit && (
                <div className='text-center'>
                    <button onClick={loadMore} className='btn btn-outline-success'>Load More</button>
                </div>
            
        ))
    }
    const handleFilters = (data, filterBy) => {
        setMyFilters({...myFilters, [filterBy]: data})
    }
  return (
    <div>
      <Layout
        title="Shop Page"
        description="Choice your favorite product in our store"
        className="container"
      >
        <div className="row">
            <div className='col-md-3'>
                <h4>Categories</h4>
                <FilterByCategory 
                    categories={categories}
                    handleFilters={(data) => handleFilters(data, 'category')}
                />
                <hr />
                <h4>Prices</h4>
                <FilterByPrice handleFilters={(data) => handleFilters(data, 'price')} />
            </div>
            <div className='col-md-9'>
                <div class="row mt-3 mb-5">
                    {productsFiltred.map((product,i) => (
                        <div key={product._id} className='col-md-4'>
                            <Card product={product} imgZise="240"></Card>
                        </div>
                    ))}
                </div>
                {buttonToLoeadMore()}
            </div>
        </div>
      </Layout>
    </div>
  )
}

export default Shop
