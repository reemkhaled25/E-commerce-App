import React, { useEffect, useState } from 'react'
import Style from './VerifyCode.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';

export default function VerifyCode() {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  let validationSchema = Yup.object().shape({
    resetCode: Yup.string().required('Reset Code is required').matches(/^[0-9]{5,6}$/, 'Enter Valid Code'),

  })

  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleRestCode
  })
  async function handleRestCode(formValues) {
    console.log(formValues);

    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
      .then((res) => {
        setIsLoading(false)
        console.log(res);
        navigate('/resetpasssword')
      })
      .catch((res) => {
        setIsLoading(false)
        setErrorMessage(res?.response?.data?.message)
      })
  }
  return <>
    <Helmet>
      <link rel="icon" type="image/svg+xml" href="../../public/green-shopping-cart-10935.svg" />
      <title>Verify Code</title>
    </Helmet>
    <div className='container mx-auto py-48 w-3/4'>
      <h1 className='text-2xl text-green-600 mb-5 font-semibold'>Please Enter Reset Code :</h1>
      <form onSubmit={formik.handleSubmit}>
        <input name='resetCode' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" className='w-full py-2 rounded-md px-2 outline-0 border mb-5 border-gray-400 search' placeholder='Reset Code' id='resetCode' />

        {formik.errors.resetCode && formik.touched.resetCode ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.resetCode}</span>
          </div> : null
        }

        {errorMessage ?
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
            <span className="font-medium">{errorMessage}</span>
          </div> : null
        }

        <button type='submit' className='px-16 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition duration-500'>
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Verify'}
        </button>
      </form>
    </div>
  </>
}
