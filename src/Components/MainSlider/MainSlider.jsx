import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick';
import slide1 from '../../assets/images/slide-1.webp'
import slide2 from '../../assets/images/slide-2.avif'
import slide3 from '../../assets/images/slide-3.jpg'
import slide4 from '../../assets/images/slide-4.webp'
import slide5 from '../../assets/images/slide-5.jpg'
import slide6 from '../../assets/images/slide-6.jpeg'
import slide7 from '../../assets/images/slide-7.jpg'
import slide8 from '../../assets/images/slide-8.jpg'
export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return <>
    <Slider {...settings}>
      <img src={slide1} className='h-[400px]' alt="" />
      <img src={slide2} className='h-[400px]' alt="" />
      <img src={slide3} className='h-[400px]' alt="" />
      <img src={slide4} className='h-[400px]' alt="" />
      <img src={slide5} className='h-[400px]' alt="" />
      <img src={slide6} className='h-[400px]' alt="" />
      <img src={slide7} className='h-[400px]' alt="" />
      <img src={slide8} className='h-[400px]' alt="" />
    </Slider>
  </>
}
