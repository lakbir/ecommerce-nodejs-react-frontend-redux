import React, { Fragment, useEffect, useState } from 'react'
import { isAuthenticated, emptyCart } from '../auth/helpers'
import { Link } from 'react-router-dom'
import { createOrder, getBraintreeToken, processPayment } from './ApiCore'
import DropIn from 'braintree-web-drop-in-react'
import toastr from 'toastr'
import "toastr/build/toastr.css"

const Checkout = ({products}) => {

    const [data, setData] = useState({
        braintreeToken: null,
        error: null,
        instance: {},
        address:''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
        getBraintreeToken(userId, token)
            .then(res => setData({...data, braintreeToken: res.token}))
            .catch(err => setData({...data, error : err}))
    }, [])

    const dropIn = () => {
        <div>
            {data.braintreeToken !== null && products.length > 0 && (
                <DropIn 
                    options={{
                        authorization : data.braintreeToken
                    }}
                    onInstance={instance => data.instance = instance}
                />
            )}
        </div>
    }

    const totalToCheckout = (products) => {
        return products.reduce((total, prd) => total + (prd.count * prd.price) ,0)
    }

    const buy = () => {
        const deliveryAdress = data.address;
        data.instance.requestPaymentMethod()
            .then(data => {
                let paymentData = {
                    amount: totalToCheckout(products),
                    paymentMethodNonce: data.nonce
                }

                processPayment(userId, token, paymentData)
                    .then(res => {
                        
                        let orderData = {
                            products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: deliveryAdress
                        }
                        createOrder(userId,token,orderData)
                            .then(res => console.log(res))
                            .catch(err => console.error(err))

                        emptyCart(() => {
                            toastr.success('Payment Valide', 'Thanks, Your payment was successfully', {
                                positionClass:"toast-bottom-left"
                              })   
                        })
                    })
                    .catch(err => {
                        toastr.error('Invalide', err, {
                            positionClass:"toast-bottom-left"
                          })                        
                    })
            })
            .catch(err => {
                toastr.error("Invalid Paiment", err.message, {
                    positionClass:"toast-bottom-left"
                  })
            })
    }

    const showBtnToCheckout = () => {
        if(isAuthenticated()) {
            return (
                <Fragment>
                    <div>
                        {data.braintreeToken !== null && products.length > 0 && (
                            <DropIn 
                                options={{
                                    authorization : data.braintreeToken,
                                    paypal: {
                                        flow: 'vault'
                                    }
                                }}
                                onInstance={instance => data.instance = instance}
                            />
                        )}
                    </div>
                    <button onClick={buy} className='btn btn-success btn-raised btn-block' >Pay</button>
                </Fragment>
            )
        } else {
            return (
                <Link to='/signin'>
                    <button className='btn btn-warning btn-raised btn-block' >Signin to checkout</button>
                </Link>
            )
        }
    }

    const handleAdress = (e) => {
        setData({...data, address: e.target.value})
    }

  return (
    <div>
      <h2 className='text-center'>Total : <span className='badge badge-success'>$ {totalToCheckout(products)}</span></h2>
      
      <label htmlFor='adress'>Delivery Adress</label>
      <textarea placeholder='Delivery Adress...' className='form-control' id='adress' onChange={handleAdress} rows='2'  />
      
      {showBtnToCheckout()}
    </div>
  )
}

export default Checkout
