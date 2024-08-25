import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Home from '../Home/Home'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { CountContext } from '../../Context/CountContext'

export default function Navbar() {

  let navigate = useNavigate()
  let { userLogin, setuserLogin } = useContext(UserContext)
  let {CartCount } = useContext(CountContext)

  function logOut() {
    setuserLogin(null)
    localStorage.removeItem('token')
    navigate('/login')

  }
  return <>
    <nav className=' text-white bg-zinc-800 fixed top-0 left-0 right-0 z-50'>
      <div className="container flex justify-between items-center mx-auto py-5">
        <div className="logo flex items-center justify-center gap-3 text-2xl">
          <i className="fa-solid fa-cart-shopping text-green-600 text-3xl "></i>
          <h1><Link to="">Fresh Cart</Link></h1>
        </div>
        <div className="nav-links">
          <ul className='flex justify-evenly items-center gap-3'>
            {userLogin != null ? <>
              <li><NavLink to="">Home</NavLink></li>
              <li><NavLink to="products">Products</NavLink></li>
              <li><NavLink to="categories">Categories</NavLink></li>
              <li><NavLink to="brands">Brands</NavLink></li>
              <li><NavLink to="wishlist">Wish List</NavLink></li>
              <li><NavLink to="cart">Cart</NavLink></li>
            </> : null}
          </ul>
        </div>
        <div className="cart-auth flex items-center">
          {userLogin != null ? <>
            <div className=' me-7 relative'>
              <i className="fa-solid fa-cart-shopping text-2xl me-7"></i>
              <span className='cart-count' >{CartCount}</span>
            </div>

            <button onClick={logOut} className='text-red-500 me-7'>LogOut</button>
          </> : null}
          {userLogin == null ? <>
            <div>
              <button className=' me-7'><NavLink to="register">Register</NavLink></button>
              <button className=''><NavLink to="login">LogIn</NavLink></button>
            </div>
          </> : null}
        </div>
      </div>
    </nav>
  </>
}
