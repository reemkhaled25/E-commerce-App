import React, { useContext, useEffect, useState } from 'react'
import Style from './CheckOut.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from "react-helmet";
export default function CheckOut() {

  let cartId = useParams()
  let { cartCheckOut, deleteCart } = useContext(CartContext)

  async function checkOutPayment(values) {
    setIsLoading(true)
    let response = await cartCheckOut(cartId.id, values)
    if (response.data.status == 'success') {
      window.open(response.data.session.url, '_self')
      setIsLoading(false)
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  let validationSchema = Yup.object().shape({
    details: Yup.string().min(3, 'Details minimum length is 3 letters').max(20, 'Details maximum length is 20 letters').required('Details is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone number must be a valid egyption number').required('Phone number is required'),
    city: Yup.string().min(3, 'City minimum length is 3 letters').max(10, 'City maximum length is 10 letters').required('City is required'),

  })

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',

    },
    validationSchema: validationSchema,
    onSubmit: checkOutPayment
  })

  return <>
      <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Check Out</title>
    </Helmet>
    <div className="container py-36 mx-auto px-40 w-3/4">
      <h1 className='text-4xl text-green-600 font-bold text-center mb-8'>Pay Now</h1>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details" className='block mb-2 text-green-600 font-semibold'>Enter Details :</label>
        <input name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400 search' placeholder='Details' id='details' />

        {formik.errors.details && formik.touched.details ?
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.details}</span>
          </div> : null
        }

        <label htmlFor="phone" className='block mb-2 text-green-600 font-semibold'>Enter Your Phone :</label>
        <input name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" className='w-full py-1 rounded-md px-2 outline-0 mb-7 border border-gray-400 search' placeholder='Phone' id='phone' />

        {formik.errors.phone && formik.touched.phone ?
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.phone}</span>
          </div> : null
        }

        <label htmlFor="city" className='block mb-2 text-green-600 font-semibold'>Enter City :</label>
        <input name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" className='w-full py-1 rounded-md px-2 outline-0 border mb-5 border-gray-400 search' placeholder='City' id='city' />

        {formik.errors.city && formik.touched.city ?
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.city}</span>
          </div> : null
        }
        <div className=' text-center'>
          <button type='submit' className='px-16 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-500'>
            {isLoading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Check Out'}
          </button>

        </div>
      </form>
    </div>
  </>
}
