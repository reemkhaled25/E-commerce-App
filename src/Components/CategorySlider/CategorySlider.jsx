import React, { useEffect, useState } from 'react'
import Style from './CategorySlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';
export default function CategorySlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const [categories, setCategories] = useState([])
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data)
      }).catch(() => {
      })
  }
  useEffect(() => {
    getCategories()
  }, [])

  return <>
    <div className=' mt-14'>
      <Slider {...settings}>
        {categories.map((category) => <div key={category._id}>
            <img src={category.image} className='w-full h-[200px]' alt="" />
            <h1 className='text-center text-green-900 font-semibold'>{category.name}</h1>
          </div>
        )}
      </Slider>
    </div>
  </>
}
