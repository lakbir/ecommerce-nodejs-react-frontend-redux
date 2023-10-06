import React, { useEffect, useState } from 'react'
import { getCategories, getProducts } from './ApiCore'
import Card from './Card'

const Search = () => {

    const [categories, setCategories] = useState([])
    const [searchData, setSearchData] = useState({search:'', category: ''})
    const [products, setProducts] = useState([]);

    const handleChange = (e) => {
        setSearchData({...searchData, [e.target.id]: e.target.value})
    }

    useEffect(() => {
        getCategories().then(res => setCategories(res))
    },[])

    const searchSubmit = (e) => {
        e.preventDefault();
        let {search, category} = searchData;
        if(search || category){
            getProducts({search: search || undefined, category})
            .then(res => setProducts(res))
            .catch(err => console.error(err))
        } else {
            setProducts([])
        }
        
    }

    const resulMessage = () => {
        return products && products.length > 0 && (
            
            <h3><hr />Found {products.length} product(s)</h3>
        )
    }

  return (
    <div>
      <form onSubmit={searchSubmit}>
        <div className='input-group input-group-lg'>
            <div className='input-group-prepend'>
                <select onChange={handleChange} id="category" className='btn'>
                    <option value="">Select a category</option>
                    { categories && categories.map((category, i) => (
                        <option value={category._id} id={category._id}>{category.name}</option>
                    )) }
                    
                </select>
            </div>
            <input onChange={handleChange} id="search" type='search' className='form-control mx-4' />
            <div className='input-group-apprend'>
                <button className='btn btn-outline-primary'>Search</button>
            </div>
        </div>
      </form>

        {resulMessage()}

         <div className='row'>
            {products && products.map((product, i) => (
                <div key={product._id} className='col-md-4'>
                    <Card product={product} imgZise="335"></Card>
                </div>
            ))}
        </div>                   

    </div>
  )
}

export default Search
