import React, { useState, useContext } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { authContext} from '../Context/AuthContext'



export default function Loginister() {
    const [isCallingLoginAPI, setIsCallingLoginAPI] = useState(false)
    const [apiError, setAPIError] = useState(null)

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{6,8}$'), 'Invalid Passwrd').required('Password is required'),
    })
   
const {setToken}=useContext(authContext)

    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    }

const navigate = useNavigate()

    const loginForm = useFormik({
      initialValues,
      validationSchema,
      onSubmit: callLoginAPI
    })

    async function callLoginAPI(values) {
     try {
      setIsCallingLoginAPI(true)
      setAPIError(null)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginForm.values)
      setIsCallingLoginAPI(false)
      localStorage.setItem('userToken', data.token)
      setToken(data.token)
      navigate('/')
    }
    catch (error) {
      setIsCallingLoginAPI(false)
      setAPIError(error.response.data.message)
    }
  } 

  return (
    
<form onSubmit={loginForm.handleSubmit} className="max-w-xl mx-auto px-3">
  <h2 className='md:text-3xl text-main py-4'>Login:</h2>
  {apiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
      </div> : null}

  <div className=" w-full mb-5 group">
    <input type="email" name="email" value={loginForm.values.email} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder="Email" required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-main dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
    {loginForm.errors.email && loginForm.touched.email? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {loginForm.errors.email}
      </div> : null}
  </div>
  <div className=" w-full mb-5 group">
    <input type="password" name="password" value={loginForm.values.password} onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer" placeholder="Password" required />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-main dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    {loginForm.errors.password && loginForm.touched.password? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {loginForm.errors.password}
      </div> : null}
  </div>

  {isCallingLoginAPI? <div className=' bg-main rounded-lg w-full md:w-[85px] h-10 flex ml-auto ' >
      <ScaleLoader color="#ffffff" />
    </div>:<button type="submit" className=" flex ml-auto text-white bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>}
    
    
    
  
  
</form>


  )
}
