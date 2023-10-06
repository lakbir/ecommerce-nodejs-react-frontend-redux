import React, { useState } from 'react'
import Layout from '../core/Layout'
import { API_URL } from '../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"

const Signin = () => {

  const [user, setUser] = useState({
    email:'',
    password: ''
  })

  const handleChange = (e) => {
    setUser({...user, [e.target.id] : e.target.value})
  }

  const submitSignIn = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signin`, {
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
        toastr.info("User has been connected", 'Login', {
          positionClass:"toast-bottom-left"
        })
        localStorage.setItem('jwt_info', JSON.stringify(res));
      }
    })
    .catch(err => {
      toastr.error(err, 'Server Error', {
        positionClass:"toast-bottom-left"
      })
    })
  }

  const form = () => (
    <form onSubmit={submitSignIn}>
      <div className='form-group'>
        <label htmlFor='email' className='text-muted'>E-mail</label>
        <input onChange={handleChange} type='email' className='form-control' id="email" />
      </div>
      <div className='form-group'>
        <label htmlFor='password' className='text-muted'>Password</label>
        <input onChange={handleChange} type='password' className='form-control' id="password" />
      </div>
      <button className='btn btn-lg btn-block btn-outline-primary'>Sign In</button>

    </form>
    )
  return (
    <div>
    <Layout 
      title="Sign In" 
      description="Sign In - Node React Ecommerce App" 
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

export default Signin
