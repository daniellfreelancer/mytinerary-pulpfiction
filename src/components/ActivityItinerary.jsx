import React from 'react'
import { useGetActivitiesQuery } from '../features/activityAPI'

function ActivityItinerary(props) {
    
    let idItinerary = props.id
    const { data: activities } = useGetActivitiesQuery(idItinerary)
    let activitiesDetail = activities?.response

  return (
    <>
        { activitiesDetail ?
            activitiesDetail?.map((e)=>{
                return (
                    <div className='activity-div'  key={e._id}>
                        <img className='activity-img'  src={e.photo} alt={e.name} />
                        <p className='activity-p' >{e.name}</p>
                    </div>
                )
            })
            :
            <p>Still no have Activities</p>
        }
    </>
  )
}

export default ActivityItinerary