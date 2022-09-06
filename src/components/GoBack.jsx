import React from 'react'
import { useNavigate } from 'react-router-dom'

function GoBack() {
  const gobackbutton = useNavigate()
  const handleBack = () => {
    gobackbutton('/cities')
  }
  return (
    <button className='goback-btn navlink' onClick={handleBack}>GoBack</button>
  )
}

export default GoBack