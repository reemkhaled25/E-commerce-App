import React, { useEffect, useState } from 'react'
import Style from './LoadingScreen.module.css'
export default function LoadingScreen() {

  return <>
  <div className='fixed top-0 left-0 right-0 bottom-0 bg-green-900 flex items-center justify-center z-50'>
  <span className="loader"></span>
  </div>

  </>
}
