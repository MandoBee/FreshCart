import React, { useEffect, useState } from 'react'
import styles from './TemplateName.module.css'

export default function TemplateName() {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        console.log('component mounted')
        return () => {
            console.log('component unmounted')
        }
    }, [])

  return (
    <>
    <div>templateName</div>
    </>
  )
}
