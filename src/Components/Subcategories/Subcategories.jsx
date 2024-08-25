import React, { useEffect, useState } from 'react'
import Style from './Subcategories.module.css'
import axios from 'axios'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
export default function Subcategories(props) {

  const [subCategories, setSubCategories] = useState([])
  const [loadingScreen, setLoadingScreen] = useState(false)

  function getSubcategories() {
    setLoadingScreen(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${props?.id}/subcategories`)
      .then(({ data }) => {
        setSubCategories(data.data)
        setLoadingScreen(false)
      })
      .catch(() => {

      })
  }
  useEffect(() => {
    getSubcategories()

  }, [props.id])
  return <>
<div>
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>All Subcategories</h1> 
      <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4'>
        {subCategories?.map((category) => <div key={category?._id} className="card font-semibold text-center py-3 border border-solid border-green-600 rounded-md ">
          <h1>{category?.name} </h1>
        </div>)}
      </div>
    </div>
  </>
}
