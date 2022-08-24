import React from 'react'
import '../App.css'
import Logo from './Logo'
import CallToAction from './CallToAction'

const Hero = () => {
  return (
    <div className='Hero-container'>
        <div className='Hero-titles'>
            <Logo />
            <CallToAction />
        </div>
    </div>
  )
}

export default Hero