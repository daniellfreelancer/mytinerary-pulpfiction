import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from '../api'

export const itineraryAPI = createApi({

    reducerPath: "itineraryAPI",


    baseQuery: fetchBaseQuery({
        baseUrl: api_url
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
        likeTineraries: builder.mutation({
            query: (itineraryIDLike) => ({
                url: `/myItineraries/likes/${itineraryIDLike}`,
                method: 'PATCH',
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
        }),


    })
})

export default itineraryAPI
export const { useGetAllItineraryQuery, useGetTinerariesQuery, useDeleteTinerariesMutation, useCreateItineraryMutation, useLikeTinerariesMutation } = itineraryAPI
