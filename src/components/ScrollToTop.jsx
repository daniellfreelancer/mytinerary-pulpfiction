import React from 'react'
import {useEffect} from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const {pathname} = useLocation()

  function scrolled(){
    
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });

    
  }
  useEffect(() => {
    scrolled()
  }, [pathname])

  
  return (
    <button className='Button-Top' onClick={scrolled} >Top ▲</button>
  )
}

export default ScrollToTop