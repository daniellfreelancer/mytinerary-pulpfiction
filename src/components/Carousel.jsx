import React from 'react'
import '../App.css'

function Carousel(props) {

    const arrayCity = props.cities

  return (
    <div>
        
    {arrayCity.slice(0,4).map((e)=>{
        return(
            <div className='Slider-container' key={e.id} >
                <img src={e.img} />
                <p> {e.city} </p>
            </div>
        )
    })} 

    </div>
  )
}

export default Carousel