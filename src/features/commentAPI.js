import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from '../api'

export const commentAPI = createApi({
    reducerPath: "commentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: api_url
    }),
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (idItinerary) => `/comments/?itinerary=${idItinerary}`
        }),
        createComments :builder.mutation({
            query: (newComment) => ({
                url: '/comments',
                method: 'POST',
                body: newComment,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
        })
    })
}
)

export default commentAPI
export const { useGetCommentsQuery, useCreateCommentsMutation} = commentAPI