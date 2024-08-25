import React, { useEffect, useState } from 'react'
import Style from './About.module.css'
import CategorySlider from '../CategorySlider/CategorySlider'
import img1 from '../../assets/images/bg-1.jpg'
import img2 from '../../assets/images/bg-2.jfif'
import MainSlider from '../MainSlider/MainSlider'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
export default function About() {

  return <>
  <div className='container mx-auto mt-24 text-center'>
  <h1 className='text-4xl text-green-600 font-bold text-center mb-4'>About Us</h1>
  <p className='text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
  <div className='flex  mt-10'> 
    <div className='w-3/4' >
    <MainSlider />
    </div>
    <div className='w-1/4'>
      <img src={img1} className=' w-full h-[200px]' alt="" />
      <img src={img2} className='w-full h-[200px]' alt="" />
    </div>
  </div>
  </div>

    <CategorySlider />
  </>
}
