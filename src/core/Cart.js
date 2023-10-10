import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './Layout'
import Image from './Image'
import { decProductCount, incProductCount, removeProduct } from '../actions/cartActions'
import Checkout from './Checkout'

const Cart = () => {

    let productsInCart = useSelector(state => state.cart.products)
    let dispatch = useDispatch();

  return (
    <div>
        <Layout
          title="My Cart"
          description="List of my products"
          className="container-fluid">

            <div className='row'>
                <div className='col-md-9'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsInCart.map((product, index) => (
                                <tr key={product._id}>
                                    <td>
                                    <Image item={product} className="card-img-to" url="products/photo" imgZise="100" />

                                    </td>
                                    <td>
                                        <h5>{product.name}</h5>
                                        <p className='well'> {product.description} </p>
                                    </td>
                                    <td>
                                        <div className='input-group'>
                                            
                                            <div className='input-group-prepend'>
                                                <button onClick={() => dispatch(incProductCount(product))} className='btn btn-raised btn-sm btn-success'> <i className='material-icons'>add</i> </button>
                                                <h5><span className='span span-success mx-2'> {product.count} </span></h5>
                                                {product.count > 1 && (
                                                <button onClick={() => dispatch(decProductCount(product))} className='btn btn-raised btn-sm btn-warning'> <i className='material-icons'>remove</i> </button>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.price}</td>
                                    <td>{product.price * product.count}</td>
                                    <td className='text-right'>
                                            <button onClick={() => dispatch(removeProduct(product._id))} className='btn btn-sm btn-danger'>
                                                    <i className='material-icons'>delete</i>
                                            </button>
                                    </td>
                                </tr>                                
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className='col-md-3'>
                    <Checkout products={productsInCart} />
                </div>
            </div>

        </Layout>
    </div>
  )
}

export default Cart
