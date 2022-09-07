import React from 'react'
import { useParams } from 'react-router-dom'
import GoBack from '../components/GoBack'
import Layout from '../layouts/Layout'
import { useGetCityByIdQuery } from '../features/citiesAPI'
import '../styles/App.css'
import api_url from '../api'
import Itineraries from '../components/Itineraries'


function Details() {
    const { id } = useParams()

    const { data: cities } = useGetCityByIdQuery(id)

    let cityDetail = cities?.response

    let cityFundation = new Date(cityDetail?.fundation)
    let yearFundation = cityFundation.getFullYear()

    return (
        <Layout>

            <div className="bigcard">
                <h2 className="detailtitle">{cityDetail?.city}</h2>
                <div className="bigcard-photo">
                    <img src={cityDetail?.photo} alt={cityDetail?.featuredLocation} />
                </div>
                <div className="details">
                    <div className="info1">
                        <p>Country: {cityDetail?.country}</p>
                        <p>Population: {cityDetail?.population} habitants</p>
                        <p>Fundation: {yearFundation}</p>
                    </div>
                </div>
                <div className="description-detail">
                    <h2>Information</h2>
                    <p>{cityDetail?.description}</p>
                </div>
                <div className="itineraries-div">
                    <Itineraries/>
                </div>
            </div>
            <GoBack />
        </Layout>
    )
}

export default Details