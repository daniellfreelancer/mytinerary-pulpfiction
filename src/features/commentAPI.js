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

    })
}
)

export default commentAPI
export const { useGetCommentsQuery, useCreateCommentsMutation, useDeleteCommentsMutation, useUpdateCommentsMutation} = commentAPI