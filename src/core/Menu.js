import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { API_URL } from '../config';
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { isAuthenticated } from '../auth/helpers';

const Menu = () => {
    const location = useLocation();
    const pathName = location.pathname;

    const signout = () => {
        fetch(`${API_URL}/signout`)
        .then(() => {
            toastr.info("User SignOut", 'Next Time', {
                positionClass:"toast-bottom-left"
              })
            localStorage.removeItem('jwt_info')
        })
        .catch(err => {
            toastr.error(err, 'Server error !', {
                positionClass:"toast-bottom-left"
              })
        })
    }

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {/* Component */}
                    <Fragment>
                        <div className="navbar-nav">
                            <Link style={ {color : pathName === '/' ? '#ffbf00':'#fff'}} className="nav-link" to="/">Home</Link>
                            <Link style={ {color : pathName === '/shop' ? '#ffbf00':'#fff'}} className="nav-link" to="/shop">Shop</Link>
                        </div>  
                        <div className="navbar-nav">
                            <Link 
                            style={ {color : pathName === '/dashboard' ? '#ffbf00':'#fff'}} 
                            className="nav-link" 
                            to={`${(isAuthenticated() && isAuthenticated().user.role === 1) ? '/admin' : ''}/dashboard`}>
                            Dashboard</Link>
                        </div>                      
                    </Fragment>
                {/* )} */}

            <div className="navbar-nav ml-auto">
                { !isAuthenticated() && (
                    <Fragment>
                        <Link style={ {color : pathName === '/signin' ? '#ffbf00':'#fff'}} className="nav-link" to="/signin">Connexin</Link>
                        <Link style={ {color : pathName === '/signup' ? '#ffbf00':'#fff'}} className="nav-link" to="/signup">Register</Link>
                    </Fragment>
                )}
                                
                { isAuthenticated() && (
                    <Fragment>
                        <span style={{cursor: 'pointer'}} className="nav-link" onClick={signout} >SignOut</span>
                    </Fragment>
                )}
                
            </div>
            </div>
        </div>
    </nav>
</div>
  )
}

export default Menu
