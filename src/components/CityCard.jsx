import React, { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles/App.css'
import axios from 'axios'


function CityCard() {


    const [itineraries, setItineraries] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/cities/').then(res => setItineraries(res.data.response))
    }, [])
    

    return (
        <div className='CityCard-container' >

            {
                itineraries.map((e) => {
                    return (
                        <div className="paper" key={e._id} >
                            <img className="poster" src={e.photo} alt={e.city} />
                            <h2 className="title-city">{e.city}</h2>
                            <hr />
                            <p className="p-city">{e.smalldescription}</p>
                            <LinkRouter to={`/details/${e._id}`} className="btn-read">Discover!</LinkRouter>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default CityCard