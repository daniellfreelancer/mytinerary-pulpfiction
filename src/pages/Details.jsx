import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GoBack from '../components/GoBack'
import Layout from '../layouts/Layout'
import axios from 'axios'
import '../styles/App.css'
import api_url from '../api'

function Details() {
    const { id } = useParams()

    const [cityDetail, setCityDetail] = useState([])

    useEffect(() => {
        axios.get(api_url + '/cities/' + id).then(res => setCityDetail(res.data.response))
    }, [id])
    let cityFundation = new Date(cityDetail.fundation)
    let yearFundation = cityFundation.getFullYear()

    return (
        <Layout>

            <div className="bigcard">
                <h2 className="detailtitle">{cityDetail.featuredLocation}</h2>
                <div className="bigcard-photo">
                    <img src={cityDetail.photo} alt={cityDetail.featuredLocation} />
                </div>
                <div className="details">
                    <div className="info1">
                        <p>City: {cityDetail.city}</p>
                        <p>Country: {cityDetail.country}</p>
                    </div>
                    <div className="info2">
                        <p>Population: {cityDetail.population} habitants</p>
                        <p>Fundation: {yearFundation}</p>
                    </div>
                </div>
                <div className="description-detail">
                    <h2>Information</h2>
                    <p>{cityDetail.description}</p>
                </div>
            </div>
            <GoBack />
        </Layout>
    )
}

export default Details