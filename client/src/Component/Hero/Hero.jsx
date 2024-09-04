import React from 'react'
import { Outlet } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
        <Outlet/>
    </div>
  )
}

export default Hero