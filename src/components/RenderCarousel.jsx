import React from 'react'
import ButtonCarousel from './ButtonCarousel'
import Carousel from './Carousel'

const RenderCarousel = () => {
    const itineraries = [
        {id: 1,
            img: "https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/cambodia.png",
        city: 'Cambodia'},
        {id: 2,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/baliTemple.png',
        city: 'Bali'},
        {id: 3,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/boraBora.png',
        city: 'Bora Bora Island'},
        {id: 4,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/canaimaBolivar.png',
        city: 'Bolívar'},
        {id: 5,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/japanHonshuIsland.png',
        city: 'Honshu Island'},
        {id: 6,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/maldives.png',
        city: 'Maldives Islands'},
        {id: 7,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/peritoMorenoCalafate.png',
        city: 'Calafate'},
        {id: 8,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/sidney.png',
        city: 'Sydney'},
        {id: 9,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/tenochtitlan.png',
        city: 'Tenochtitlan'},
        {id: 10,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/torresDelPaineMagallanesRegion.png',
        city: 'Magallanes Region'},
        {id: 11,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/victoriaFallsZambia.png',
        city: 'Zambia'},
        {id: 12,
            img: 'https://raw.githubusercontent.com/daniellfreelancer/citiesCloudImg/main/salahCitadelCairoCity.png',
        city: 'Cairo City'},
    ]

  return (
    <div className='Render-div' >
        <div className='Render-div-title'>
            <h2 className='Carousel-title' >Popular MYtineraries</h2>
        </div>
        <Carousel cities={itineraries} slides={3} range={4} />
    </div>
  )
}

export default RenderCarousel