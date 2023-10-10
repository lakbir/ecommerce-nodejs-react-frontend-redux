import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../auth/helpers';
import { getStatus, listOfOrders, updateOrderStatus } from '../ApiAdmin';
import Layout from '../../core/Layout';
import moment from 'moment/moment';
import Product from './../../core/Product';

const ListOrders = () => {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([]);
    const {user, token} = isAuthenticated();

    const loadOrders = (userId, token) => {
        listOfOrders(userId, token).then(res => setOrders(res)).catch(err => console.error(err));
    }

    const loadStatus = (userId, token) => {

        getStatus(userId, token)
            .then(res => {
                setStatus(res.status)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        loadOrders(user._id, token);
        loadStatus(user._id, token);
    }, [])

    const handleStatus = (e, order) => {
        updateOrderStatus(user._id, token, order._id, e.target.value)
            .then(res => {
                loadOrders(user._id, token);
            }).catch(err => {
                console.error(err)
            })
    }

    const showStatus = (order) => {
        return status.length && (
            <>
                <h4>Status : {order.status} </h4>
                <select onChange={e => handleStatus(e, order)} className='form-control'>
                    <option value="">Select Status</option>
                    {status.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </>
        )
    }

    const notOrders = () => {
        if(orders.length === 0 ){
            return (
                <div className='alert alert-warning text-center my-5 display-3'>
                    Not Orders Yet !
                </div>
            )
        } else {
            return (
                <div className='alert alert-info text-center my-5 display-3'>
                    Total Order : {orders.length}
                </div>
            )
        }
    }

    const showInput = (key, value) => {
        return (
            <div className='form-group my-4'>
                <label htmlFor={key}>{key}</label>
                <input id={key} value={value} readOnly type='text' className='form-control' />
            </div>
        )
    }
    const showOrders = () => {
        return orders.length && orders.map(order => (
            <div className='my-3' key={order._id}>
                <ul className='list-group'>
                    <li className='list-group-item active'> <strong>Transaction ID</strong> {order.transaction_id} </li>
                    <li className='list-group-item'> <strong>Amount</strong> $ {order.amount} </li>
                    <li className='list-group-item'> {showStatus(order)} </li>
                    <li className='list-group-item'> <strong>Ordered</strong> {moment(order.createdAt).fromNow()} </li>
                    <li className='list-group-item'> <strong>Customer</strong> {order.user.name} </li>
                    <li className='list-group-item'> <strong>Delivery Address</strong> {order.address} </li>
                </ul>
                <div className='my-5'>
                    <h3 className='display-4 my-3'>Total Products {order.products.length} </h3>
                    { order.products.map(product => (
                        <div key={product._id} className='card text-white bg-primary mb-3' >
                            <div className='card-header'> {product.name} </div>
                            <div className='card-body'>
                                {showInput('Product ID', product._id)}
                                {showInput('Product Name', product.name)}
                                {showInput('Product Price', product.price)}
                                {showInput('Product Quantity', product.count)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))
    }

  return (
    <div>
            <Layout
                title="Orders"
                description="Orders Management"
                className="container"
            >
                <div className="row">
                    <div className='col-md-6 mx-auto'>
                        {notOrders()}
                        {showOrders()}
                    </div>
                </div>
            </Layout>
    </div>
  )
}

export default ListOrders
