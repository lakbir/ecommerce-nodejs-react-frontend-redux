import React, { Fragment } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/helpers'
import { Link } from 'react-router-dom'

function Dashboard() {

    const userHistory = () => {
        return (
            <div className='card'>
              <div className="card-body">
                <h5 className="card-title">Purshase History</h5>
                <ul className="list-group-flush">
                    <li className="list-group-item">History</li>
                </ul>
              </div>
            </div>
        )
    }

    const userInfos = () => {
        return (
            <div className='card'>
              <div className="card-body">
                <h5 className="card-title">User Informations</h5>
                <ul className="list-group-flush">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role ? 'Admin' : 'User'}</li>
                </ul>
              </div>
            </div>
        )
    }

    const userLinks = () => {
        return (
            <div className='card'>
              <div className="card-body">
                <h5 className="card-title">User Links</h5>
                <ul className="list-group-flush">
                    <li className="list-group-item">
                        <Link className='nav-link' to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link' to="/profile">MProfile</Link>
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
                    <div className="col-md-3">
                        {userLinks()}
                    </div>
                    <div className="col-md-9">
                        {userInfos()}
                        <hr />
                        {userHistory()}
                    </div>
                </div>
            </Layout>
        </Fragment>
      
    </div>
  )
}

export default Dashboard
