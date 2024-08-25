import React, { useEffect, useState } from 'react'
import Style from './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')



  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase and at least be 10 letters').required('Password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',

    },
    validationSchema: validationSchema,
    onSubmit: handleResetPassword
  })

  async function handleResetPassword(formValues) {
    setIsLoading(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValues)
      .then((res) => {
        console.log(res);
        setIsLoading(true)
        navigate('/login')

      })
      .catch((res) => {
        setIsLoading(false)
        setErrorMessage(res?.response?.data?.message)
      })
  }

  return <>
      <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Reset Password</title>
    </Helmet>
    <div className='container mx-auto py-48 w-3/4'>
      <h1 className='text-2xl text-green-600 mb-5 font-semibold'>Please Reset Your Password :</h1>
      <form onSubmit={formik.handleSubmit}>
        <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400 search' placeholder='Email' id='email' />

        {formik.errors.email && formik.touched.email ?
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.email}</span>
          </div> : null
        }

        <input name='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" className='w-full py-1 rounded-md px-2 outline-0 mb-5 border border-gray-400 search' placeholder='Password' id='newPassword' />

        {formik.errors.newPassword && formik.touched.newPassword ?
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.newPassword}</span>
          </div> : null
        }


        {errorMessage ?
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">{errorMessage}</span>
          </div> : null
        }
        <button type='submit' className='px-16 py-2 bg-green-600 text-white rounded  hover:bg-green-500 transition duration-500'>
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Reset Password'}
        </button>
      </form>
    </div>

  </>
}
