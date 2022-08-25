import React from 'react'
import '../styles/App.css'
import Logo from './Logo'
import CallToAction from './CallToAction'
import Slogan from './Slogan'

const Hero = () => {
  return (
    <div className='Hero-container'>
        <div className='Hero-titles'>
            <Logo />
            <CallToAction />
            <Slogan/>
        </div>
    </div>
  )
}

export default Hero