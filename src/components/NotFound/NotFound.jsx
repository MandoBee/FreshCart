import React, { useEffect, useState } from 'react'
import styles from './NotFound.module.css'
import ErrorPage from './../../assets/images/error.svg'

export default function NotFound() {
    const [count, setCount] = useState(0)

  return (
    <div className='w-1/2 mx-auto my-10'>
      <img src={ErrorPage} alt="Error Page" className='w-full'/>
    </div>
  )
}
