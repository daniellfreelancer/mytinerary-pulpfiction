import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import axios from 'axios'
import api_url from '../api'

const RenderCarousel = () => {
    const [itineraries, setItineraries] = useState([])

    useEffect(() => {
        axios.get(api_url + '/cities/').then(res => setItineraries(res.data.response))
    }, [])
    

  return (
    <div className='Render-div' >
        <div className='Render-div-title'>
            <h2 className='Carousel-title' >Popular Cities</h2>
        </div>
        <Carousel cities={itineraries} slides={3} range={4} />
    </div>
  )
}

export default RenderCarousel