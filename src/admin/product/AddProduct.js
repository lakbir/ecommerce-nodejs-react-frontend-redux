import React, { useEffect, useState } from 'react'
import Layout from '../../core/Layout'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { isAuthenticated } from './../../auth/helpers';
import { API_URL } from '../../config';

function AddProduct() {
    const [product, setProduct] = useState({
        photo:'',
        name:'',
        description: '',
        quantity: 0,
        price: 0,
        shipping: false,
        category: 0
    });

    const [formData, setFormData] = useState(new FormData());
    const [categories, setCategories] = useState([]);

    useEffect(() => getCategories(), []);
    const getCategories = () => {

        fetch(`${API_URL}categories`, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(res => setCategories(res.categories))
        .catch(err => console.error(err))

     }

    const handleChange = (e) => {
        const value = e.target.id === "photo" ? e.target.files[0] : e.target.value;
        formData.set(e.target.id, value);
        setProduct({...product, [e.target.id] : value})
    }

    const submitProduct = (e) => {
        e.preventDefault();

        const {user, token} = isAuthenticated();

        fetch(`${API_URL}products/${user._id}`, {
            method : "POST",
            headers: {
              "Accept" : "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: formData
          })
          .then(res => res.json())
          .then(res => {
            if(res.error) {
              toastr.warning(res.error, 'Please check form !', {
                positionClass:"toast-bottom-left"
              })
            } else {
              toastr.success(`Product ${product.name} has been created`, 'New Product', {
                positionClass:"toast-bottom-left"
              })
              setProduct({
                photo:'',
                name:'',
                description: '',
                quantity: 0,
                price: 0,
                shipping: false,
                category: 0
            })

            setFormData(new FormData());
            }
          })
          .catch(err => {
            toastr.error(err, 'Server Error', {
              positionClass:"toast-bottom-left"
            })
          })

    }
  return (
    <div>
      <Layout
            title="Product"
            description="New Product"
            className="container"
            >
                <div className="row">
                    <div className='col-md-6 mx-auto'>
                        <form onSubmit={submitProduct}>
                        <div className='form-group'>
                                <label className='text-muted' htmlFor='photo'>Photo product</label>
                                <input onChange={handleChange} type='file' id='photo'  className='form-control-file' name='photo' />
                            </div>

                            <div className='form-group'>
                                <label className='text-muted' htmlFor=''>Product name</label>
                                <input value={product.name} onChange={handleChange} id='name' required autoFocus type='text'  placeholder="Add name of Product" className='form-control' />
                            </div>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor='description'>Description</label>
                                <textarea value={product.description} onChange={handleChange} className='form-control' name='description' id='description' cols='30' rows='5' ></textarea>
                            </div>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor='quantity'>Quantity</label>
                                <input value={product.quantity} onChange={handleChange} type='number' id='quantity' className='form-control' />
                            </div>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor='price'>Price</label>
                                <input value={product.price} onChange={handleChange} type='number' id='price' className='form-control' />
                            </div>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor='category'>Category</label>
                                <select value={product.category} onChange={handleChange} className='form-control' id='category' name='category'>
                                    <option value="0">Select category</option>
                                    { categories && categories.map((category,i) => (
                                        <option key={i} value={category._id}> {category.name} </option>
                                    ))}
                                    
                                </select>
                            </div>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor='shipping'>Shipping</label>
                                <select value={product.shipping} onChange={handleChange} className='form-control' id='shipping' name='shipping'>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            <button className='my-5 btn btn-outline-primary' >New Product</button>

                        </form>
                    </div>
                </div>
            </Layout>
    </div>
  )
}

export default AddProduct
