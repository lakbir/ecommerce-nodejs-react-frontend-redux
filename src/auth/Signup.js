import React, { useState } from 'react'
import Layout from '../core/Layout'
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"

const Signup = () => {

  const [user, setUser] = useState({
    name:'',
    email:'',
    password: ''
  })

  const handleChange = (e) => {
    setUser({...user, [e.target.id] : e.target.value})
  }

  const submitSignUp = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signup`, {
      method : "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
      if(res.error) {
        toastr.warning(res.error, 'Please check form !', {
          positionClass:"toast-bottom-left"
        })
      } else {
        toastr.success("User has been creaed successfully", 'New Account', {
          positionClass:"toast-bottom-left"
        })
      }
    })
    .catch(err => {
      toastr.error(err, 'Server Error', {
        positionClass:"toast-bottom-left"
      })
    })
  }

  const form = () => (
    <form onSubmit={submitSignUp}>
      <div className='form-group'>
          <label htmlFor='name' className='text-muted'>Name</label>
          <input onChange={handleChange} type='text' className='form-control' id="name" />
      </div>
      <div className='form-group'>
        <label htmlFor='email' className='text-muted'>E-mail</label>
        <input onChange={handleChange} type='email' className='form-control' id="email" />
      </div>
      <div className='form-group'>
        <label htmlFor='password' className='text-muted'>Password</label>
        <input onChange={handleChange} type='password' className='form-control' id="password" />
      </div>
      <button className='btn btn-lg btn-block btn-outline-success'>Sign UP</button>

    </form>
    )
  return (
    <div>
    <Layout 
      title="Sign Up" 
      description="Sign Up - Node React Ecommerce App" 
      className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            {form()}
          </div>
        </div>
        
    </Layout>
    </div>
  )
}

export default Signup
