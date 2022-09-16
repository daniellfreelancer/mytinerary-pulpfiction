import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from '../api'

export const myTinerariesAPI = createApi({

    reducerPath: "activityAPI",


    baseQuery: fetchBaseQuery({
        baseUrl: api_url
    }),


    endpoints: (builder) => ({
        getTineraries: builder.query({
            query: (userID) => `/myItineraries/?user=${userID}`
        })

    })
})

export default myTinerariesAPI
export const { useGetTinerariesQuery} = myTinerariesAPI
