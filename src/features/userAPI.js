import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({

    reducerPath: "userAPI",


    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),


    endpoints: (builder) => ({
        signUpUser: builder.mutation({
            query: (user) => ({
                url: '/auth/signup',
                method: 'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        signInUser: builder.mutation({
            query: (user) => ({
                url: '/auth/signin',
                method: 'POST',
                body: user,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        signOutUser: builder.mutation({
            query: (mail) => ({
                url: '/auth/signout',
                method: 'POST',
                body: mail,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        


    })
})

export default userAPI
export const { useSignUpUserMutation, useSignInUserMutation, useSignOutUserMutation } = userAPI