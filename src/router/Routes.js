import React from 'react'
import Signin from '../auth/Signin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from '../auth/Signup';
import Home from '../core/Home';
import Menu from '../core/Menu';
import Dashboard from '../user/Dashboard';
import AdminDashboard from '../user/AdminDashboard';
import AddCategory from '../admin/category/AddCategory';
import AddProduct from '../admin/product/AddProduct';
import Shop from '../core/Shop';
import Product from '../core/Product';

const Routers = () => {
  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route exact path="/admin/category/create" element={<AddCategory/>}/>
          <Route exact path="/admin/product/create" element={<AddProduct/>}/>
          <Route exact path="/shop" element={<Shop/>}/>
          <Route exact path="/signin" element={<Signin/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/product/:id" element={<Product/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
    </Router>
    </div>
  )
}

export default Routers
