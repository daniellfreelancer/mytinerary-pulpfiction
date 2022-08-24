import React from 'react'
import { Link as LinkTo, useLocation } from 'react-router-dom'
import {useEffect} from 'react'

function ScrollToTop() {
  const {pathname} = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  function scroll(){
    window.scrollTo(0, 0)
  }
  
  return (
    <button className='Button-Top' onClick={scroll} >Top ▲</button>
  )
}

export default ScrollToTop