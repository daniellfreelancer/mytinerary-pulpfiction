import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import citiesAPI from './features/citiesAPI'
import itineraryAPI from './features/itineraryAPI'
import activityAPI from './features/activityAPI'
import userAPI from './features/userAPI'
import  statesSlice  from './features/stateLocalStorage'
import commentAPI from './features/commentAPI'

export const store = configureStore({

    reducer: {
        [citiesAPI.reducerPath]: citiesAPI.reducer,
        [itineraryAPI.reducerPath]: itineraryAPI.reducer,
        [activityAPI.reducerPath]: activityAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        statesLocalStorage : statesSlice,
        [commentAPI.reducerPath] : commentAPI.reducer


    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(citiesAPI.middleware),



})



setupListeners(store.dispatch)
export default store