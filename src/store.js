import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import citiesAPI from './features/citiesAPI'
import itineraryAPI from './features/itineraryAPI'
import activityAPI from './features/activityAPI'


export const store = configureStore({

    reducer: {
        [citiesAPI.reducerPath]: citiesAPI.reducer,
        [itineraryAPI.reducerPath]: itineraryAPI.reducer,
        [activityAPI.reducerPath]: activityAPI.reducer,

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(citiesAPI.middleware),



})



setupListeners(store.dispatch)
export default store