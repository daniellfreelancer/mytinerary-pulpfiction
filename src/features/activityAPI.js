import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from '../api'

export const activityAPI = createApi({

    reducerPath: "activityAPI",


    baseQuery: fetchBaseQuery({
        baseUrl: api_url
    }),


    endpoints: (builder) => ({
        getActivities: builder.query({
            query: (itineraryID) => `/activities/?itinerary=${itineraryID}`
        }),
        createActivity: builder.mutation({
            query: (activity) => ({
                url: '/activities',
                method: 'POST',
                body: activity,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

        })

    })
})

export default activityAPI
export const { useGetActivitiesQuery, useCreateActivityMutation} = activityAPI
