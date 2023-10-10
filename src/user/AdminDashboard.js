import React, { Fragment } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/helpers'
import { Link } from 'react-router-dom'

function AdminDashboard() {


    const adminInfos = () => {
        return (
            <div className='card'>
              <div className="card-body">
                <h5 className="card-title">Admin Informations</h5>
                <ul className="list-group-flush">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role ? 'Admin' : 'User'}</li>
                </ul>
              </div>
            </div>
        )
    }

    const adminLinks = () => {
        return (
            <div className='card'>
              <div className="card-body">
                <h5 className="card-title">Admin Links</h5>
                <ul className="list-group-flush">
                    <li className="list-group-item">
                        <Link className='nav-link' to="/admin/category/create">New Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link' to="/admin/product/create">New Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link' to="/admin/orders">View Order</Link>
                    </li>
                    
                </ul>
              </div>
            </div>
        )
    }

    const {user : {name, role, email}} = isAuthenticated()
  return (
    <div>
        <Fragment>
            <Layout
            title="Dashboard"
            description={`Welcome ${ name }`}
            className="container"
            >
                <div className="row">
                    <div className="col-md-4">
                        {adminLinks()}
                    </div>
                    <div className="col-md-8">
                        {adminInfos()}
                    </div>
                </div>
            </Layout>
        </Fragment>
      
    </div>
  )
}

export default AdminDashboard
