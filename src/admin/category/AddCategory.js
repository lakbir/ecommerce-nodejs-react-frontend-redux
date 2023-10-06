import React, { useState } from 'react'
import Layout from '../../core/Layout'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { isAuthenticated } from './../../auth/helpers';
import { API_URL } from '../../config';

function AddCategory() {
    const [name, setName] = useState();

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const {user, token} = isAuthenticated();

        fetch(`${API_URL}categories/${user._id}`, {
            method : "POST",
            headers: {
              "Accept" : "application/json",
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({name})
          })
          .then(res => res.json())
          .then(res => {
            if(res.error) {
              toastr.warning(res.error, 'Please check form !', {
                positionClass:"toast-bottom-left"
              })
            } else {
              toastr.success(`Category ${name} has been created`, 'New Category', {
                positionClass:"toast-bottom-left"
              })
              setName('')
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
            title="Category"
            description="New Category"
            className="container"
            >
                <div className="row">
                    <div className='col-md-6 mx-auto'>
                        <form onSubmit={submitCategory}>
                            <div className='form-group'>
                                <label className='text-muted' htmlFor=''></label>
                                <input value={name} required autoFocus onChange={handleChange} type='text'  placeholder="Add name of Category" className='form-control' />
                            </div>
                            <button className='btn btn-outline-primary' >New Category</button>
                        </form>
                    </div>
                </div>
            </Layout>
    </div>
  )
}

export default AddCategory
