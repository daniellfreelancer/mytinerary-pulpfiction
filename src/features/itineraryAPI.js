import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itineraryAPI = createApi({

    reducerPath: "itineraryAPI",


    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),


    endpoints: (builder) => ({
        getAllItinerary: builder.query({
            query: (id) => `/myItineraries/?city=${id}`
        }),
        getTineraries: builder.query({
            query: (userID) => `/myItineraries/?user=${userID}`
        }),
        deleteTineraries: builder.mutation({
            query: (itineraryID) => ({
                url: `/myItineraries/${itineraryID}`,
                method: 'DELETE',
            })
        }),
        createItinerary: builder.mutation({
            query: (itinerary) => ({
                url: 'myItineraries/itineraries',
                method: 'POST',
                body: itinerary,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),


    })
})

export default itineraryAPI
export const { useGetAllItineraryQuery, useGetTinerariesQuery, useDeleteTinerariesMutation, useCreateItineraryMutation} = itineraryAPI
