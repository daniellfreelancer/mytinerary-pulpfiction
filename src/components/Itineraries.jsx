import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllItineraryQuery } from '../features/itineraryAPI'
import ActivityItinerary from './ActivityItinerary'

function Itineraries() {

    const { id } = useParams()

    const { data: itineraries } = useGetAllItineraryQuery(id)

    let itineraryDetail = itineraries?.response


    return ( 
        <>
            <h2>💙 Itineraries 💙</h2>
            <div className="Itinerary-div">

                { itineraryDetail?.map((e) => {
                    let idItinerary = e._id
                    let totalLikes = e.likes
                    let myTags = e.tags
                    let hourDuration = Math.round((e.duration) / 60)
                    console.log(idItinerary)

                    return (
                        <div className="Itinerary-detail" key={e._id}>
                            <div className='itinerary-div-img' >
                                <img src={e.photo} className="Itinerary-img" alt={e.city} />
                            </div>

                            <div className='itinerary-div-text-activities' >

                                <div className='itinerary-div-p' >
                                    <h3 className="Itinerary-p"> {e.name} </h3>
                                    <p className="Itinerary-p"> Duration: {hourDuration > 1 ? hourDuration + ` hours` : hourDuration + ` hour`} </p>
                                    <p className="Itinerary-p"> Price: $ {e.price} </p>

                                    <p className="Itinerary-p">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-bookmark-heart" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                        </svg>{totalLikes.length}  </p>
                                    <p className="Itinerary-p">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-tags" viewBox="0 0 16 16">
                                            <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                                            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                                        </svg> Tags: {myTags.join(" - ")} </p>
                                </div>
                                
                                <div className='itinerary-div-activities'>
                                    <ActivityItinerary id={e._id} />
                                    <p>Este es el Id del itinerary</p>
                                    <p> Este es el Id del itinerary :{e._id} </p>
                                </div>




                            </div>
                            <div className='toggle-comments'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-chat-heart" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                                    </svg>Comments
                                    <p>Toggle</p>

                                    
                            </div>

                        </div>
                     )  }) } 


                     </div>
                </>
                )    }


export default Itineraries