import React, { useEffect, useState } from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {


  if (localStorage.getItem('token') !== null) {
    return props.children
  } else {
    return <Navigate to={'/login'} />
  }

}
