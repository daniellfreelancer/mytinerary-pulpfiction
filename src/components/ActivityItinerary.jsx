import React from 'react'
import { useGetActivitiesQuery } from '../features/activityAPI'

function ActivityItinerary(props) {
    
    let idItinerary = props.id

    console.log(idItinerary)

    const { data: activities } = useGetActivitiesQuery(idItinerary)
    
   
    let activitiesDetail = activities?.response


  return (
    <>
        {
            activitiesDetail?.map((e)=>{
                return (
                    <div key={e._id}>
                        <p>{e.name}</p>
                        <img src={e.photo} alt={e.name} />
                        <p>{e.itinerary}</p>
                    </div>
                )
            })
        }
    </>
  )
}

export default ActivityItinerary