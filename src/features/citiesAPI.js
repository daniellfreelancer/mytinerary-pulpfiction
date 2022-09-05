import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const citiesAPI = createApi({

    reducerPath: "citiesAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    endpoints: (builder) => ({
        getAllCities: builder.query({
            query: (search) => `/cities/?city=${search}`
        }),
        getCityById: builder.query({
            query: (id) => `/cities/${id}`
        }),
        getCarousel: builder.query({
            query: () => '/cities'
        }),


    })
})

export default citiesAPI
export const { useGetAllCitiesQuery, useGetCityByIdQuery, useGetCarouselQuery } = citiesAPI
