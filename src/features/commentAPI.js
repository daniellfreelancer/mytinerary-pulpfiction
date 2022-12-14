import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from '../api'

export const commentAPI = createApi({
    reducerPath: "commentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: api_url
    }),
    endpoints: (builder) => ({
        // getComments: builder.query({
        //     query: (idItinerary) => `/comments/?itinerary=${idItinerary}`
        // }),
        getCommentsItinerary: builder.mutation({
            query: (idItinerary) => ({
                url: `/comments?itinerary=${idItinerary}`,
                method: 'GET'
            })
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
        }),
        updateComments :builder.mutation({
            query: ({ id, ...editComment }) => ({
                url: `/comments/${id}` ,
                method: 'PATCH',
                body: editComment,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
        }),
        deleteComments :builder.mutation({
            query: (idDeleteComment) => ({
                url: `/comments/${idDeleteComment}`,
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
        }),
        getCommentByUser: builder.query({
            query: (userID) => `/comments/commentbyuser/?user=${userID}`
        }),

    })
}
)

export default commentAPI
export const { useGetCommentsQuery, useCreateCommentsMutation, useDeleteCommentsMutation, useUpdateCommentsMutation, useGetCommentByUserQuery, useGetCommentsItineraryMutation} = commentAPI