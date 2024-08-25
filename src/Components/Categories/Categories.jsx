import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import img from '../../assets/images/bg-1.jpg'
import axios from 'axios'
import Subcategories from '../Subcategories/Subcategories'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { Helmet } from "react-helmet";
export default function Categories() {
  const [categories, setCategories] = useState([])
  const [id, setId] = useState(null)
  const [loadingScreen, setLoadingScreen] = useState(false)
  function getCategories() {
    setLoadingScreen(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data)
        setLoadingScreen(false)
      }).catch(() => {
      })
  }
  function getSubcategories(id) {
    setId(id)
  }
  useEffect(() => {
    getCategories()
  }, [id])
  return <>
      <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Categories</title>
    </Helmet>
  {loadingScreen?<LoadingScreen/>:   <div className="container mx-auto py-32">
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>All Categories</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 mb-9 h-1/4">
        {categories.map((category) => <div key={category._id} onClick={() => getSubcategories(category._id)} className="card p-3 rounded cursor-pointer ">
          <img src={category.image} className='w-full h-4/5 mb-4' alt="" />
          <h3 className=' text-center text-2xl text-green-600'>{category.name}</h3>
        </div>)}
      </div>
      <Subcategories id={id}/>
    </div>}
  </>
}
