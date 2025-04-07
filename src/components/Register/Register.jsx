import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [count, setCount] = useState(0)
    const [isCallingRegAPI, setIsCallingRegAPI] = useState(false)
    const [apiError, setAPIError] = useState(null)

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(5, 'Name must be at least 5 characters').max(15, 'Name must be maximum 15 characters').required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{6,8}$'), 'Invalid Passwrd').required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password is required'),
        phone: Yup.string().matches( new RegExp('^01[0125][0-9]{8}$'), 'Invalid phone number').required('Phone number is required')
    })
   
    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    }

let navigate = useNavigate()

    const regForm = useFormik({
      initialValues,
      validationSchema,
      onSubmit: callRegAPI
    })

    async function callRegAPI(values) {
     try {
      setIsCallingRegAPI(true)
      setAPIError(null)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', regForm.values)
      setIsCallingRegAPI(false)
      navigate('/login')
    }
    catch (error) {
      setIsCallingRegAPI(false)
      setAPIError(error.response.data.message)
    }
  } 

  return (
    
<form onSubmit={regForm.handleSubmit} className="max-w-xl mx-auto px-3">
  <h2 className='md:text-3xl text-main py-4'>Register Now:</h2>
  {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
      </div> : null}
  <div className=" w-full mb-5 group">
      <input type="text" name="name" value={regForm.values.name} onBlur={regForm.handleBlur} onChange={regForm.handleChange} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder="Name" required />
      <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
      {regForm.errors.name && regForm.touched.name? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {regForm.errors.name}
      </div> : null}
  </div>
  <div className=" w-full mb-5 group">
    <input type="email" name="email" value={regForm.values.email} onBlur={regForm.handleBlur} onChange={regForm.handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder="Email" required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
    {regForm.errors.email && regForm.touched.email? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {regForm.errors.email}
      </div> : null}
  </div>
  <div className=" w-full mb-5 group">
    <input type="password" name="password" value={regForm.values.password} onBlur={regForm.handleBlur} onChange={regForm.handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder="Password" required />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    {regForm.errors.password && regForm.touched.password? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {regForm.errors.password}
      </div> : null}
  </div>
  <div className=" w-full mb-5 group">
    <input type="password" name="rePassword" value={regForm.values.rePassword} onBlur={regForm.handleBlur} onChange={regForm.handleChange} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder="Re-Password" required />
    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-Password</label>
    {regForm.errors.rePassword && regForm.touched.rePassword? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {regForm.errors.rePassword}
      </div> : null}
  </div>
  <div className=" w-full mb-5 group">
    <input type="tel" name="phone" value={regForm.values.phone} onBlur={regForm.handleBlur} onChange={regForm.handleChange} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder="Phone number" required />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (0XX-123-45678)</label>
    {regForm.errors.phone && regForm.touched.phone? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {regForm.errors.phone}
      </div> : null}
  </div>
  
  {isCallingRegAPI? <div className=' bg-main rounded-lg w-full md:w-[85px] h-10 flex ml-auto ' >
      <ScaleLoader color="#ffffff" />
    </div>:<button type="submit" className=" flex ml-auto text-white bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>}
    
    
    
  
  
</form>


  )
}
