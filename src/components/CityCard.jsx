import React, { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles/App.css'
import axios from 'axios'
import SearchBar from './SearchBar'
import api_url from '../api'


function CityCard() {

    const [itineraries, setItineraries] = useState([])

    const [mySearch, setMySearch] = useState("")

    const handleSearch = (e) =>{
        setMySearch(e.target.value)
    }

    useEffect(() => {
        
            axios.get(api_url + '/cities/'+`?city=${mySearch}`).then(res => setItineraries(res.data.response))
      
        
    }, [mySearch])
    

    return (
      <div className="CityCard-container">
        
        <div className="upperbox">
          <SearchBar value={mySearch} onChange={ handleSearch}  />
        </div>

        {itineraries.map((e) => {
          return (
            <div className="paper" key={e._id}>
              <img className="poster" src={e.photo} alt={e.city} />
              <h2 className="title-city">{e.city}</h2>
              <hr />
              <p className="p-city">{e.smalldescription}</p>
              <LinkRouter to={`/details/${e._id}`} className="btn-read">
                Discover!
              </LinkRouter>
            </div>
          );
        })}
      </div>
    );
}

export default CityCard