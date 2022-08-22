import React from 'react'

function ButtonCarousel(props) {

  return (
    <button 
    className='Button-carousel' 
    onClick={props.onClick}> 
        {props.icon} 
    </button>
  )
}

export default ButtonCarousel