import React, { useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles/App.css'
import SearchBar from './SearchBar'
import { useGetAllCitiesQuery } from '../features/citiesAPI'
import NotAvailable from './NotAvailable'


function CityCard() {

  const [mySearch, setMySearch] = useState("")

  const handleSearch = (e) => {
    setMySearch(e.target.value)
  }

  const { data: cities } = useGetAllCitiesQuery(mySearch)

  let allMyCities = cities?.response

  return (
    <div className="CityCard-container">

      <div className="upperbox">
        <SearchBar value={mySearch} onChange={handleSearch} />
      </div>

      {allMyCities?.map((e) => {
        let newSmallDescription =(e.smalldescription).slice(0,300)

        return (
          <div className="paper" key={e._id}>
            <img className="poster" src={e.photo} alt={e.city} />
            <h2 className="title-city">{e.city}</h2>
            <hr />
            <p className="p-city">{newSmallDescription}</p>
            <LinkRouter to={`/details/${e._id}`} className="btn-read">
              Discover!
            </LinkRouter>
          </div>
        );
      }) 
    }
    </div>
  );
}

export default CityCard