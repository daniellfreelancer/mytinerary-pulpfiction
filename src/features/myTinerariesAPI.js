import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const myTinerariesAPI = createApi({

    reducerPath: "activityAPI",


    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),


    endpoints: (builder) => ({
        getTineraries: builder.query({
            query: (userID) => `/myItineraries/?user=${userID}`
        })

    })
})

export default myTinerariesAPI
export const { useGetTinerariesQuery} = myTinerariesAPI
