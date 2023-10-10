import React from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'
import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'

const Card = ({product, imgZise, showViewBtn = true}) => {

    let dispatch = useDispatch();

    const showStock = (quantity) => {
     
        return quantity > 0 ? <span className="badge badge-primary">{quantity} In Stock</span> : <span className="badge badge-danger">Out of Stock</span>
     
   }

  return (
    <div>
      <div className="card bg-dark mb-2 text-white px-2">
        <div className="card-header">
            <h4 className='display-6'>{product.name}</h4>
        </div>
        <Image item={product} className="card-img-to" url="products/photo" imgZise={imgZise} />
        <div className="card-body">
        <p>{product.description.substring(0, 40)}...</p>
                <div className="text-center my-3">
                     <span style={{fontSize: '15px'}} className="badge badge-info">${product.price}</span> 
                     <span className="ml-5 badge-pill badge-info">{product.category.name}</span> 

                </div>

            <div className='well'>
               <h4>{showStock(product.quantity)}</h4> 
                
                <span>Added : {moment(product.createAt).fromNow()} </span>
            </div>

            {showViewBtn && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-warning">View </button>
                </Link>
            )}

            {product.quantity > 0 && (
               <button onClick={() => dispatch(addToCart(product))} className="btn btn-success">Add to cart</button>
            )}
            </div> 
      </div>
    </div>
  )
}

export default Card
