import React, { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles/App.css'
import axios from 'axios'
import SearchBar from './SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFromServer } from '../features/citiesSlice'


function CityCard() {

    const [itineraries, setItineraries] = useState([])

    const [mySearch, setMySearch] = useState("")

    const handleSearch = (e) =>{
        setMySearch(e.target.value)
    }

    // Este permite Leer <= esto es un array
    let mycities = useSelector( value => value.cities.cities)

    //Este ejecuta la accion para poder leer
    let dispatchCities = useDispatch()


    useEffect(() => {
        
            axios.get('http://localhost:4000/cities/'+`?city=${mySearch}`).then(res => setItineraries(res.data.response))

            //activa el array
            dispatchCities(fetchFromServer())
        
    }, [])
    

    return (
      <div className="CityCard-container">
        
        <div className="upperbox">
          <SearchBar value={mySearch} onChange={ handleSearch}  />
        </div>

        {mycities.map((e) => {
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