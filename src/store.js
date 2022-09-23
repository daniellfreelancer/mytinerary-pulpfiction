import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import citiesAPI from './features/citiesAPI'
import itineraryAPI from './features/itineraryAPI'
import activityAPI from './features/activityAPI'
import userAPI from './features/userAPI'
import  statesSlice  from './features/stateLocalStorage'
import commentAPI from './features/commentAPI'
import authReducer from './features/authSignIn'
import  adminReducer  from './features/adminState'

export const store = configureStore({

    reducer: {
        auth: authReducer,
        statesLocalStorage : statesSlice,
        admin:adminReducer,
        [citiesAPI.reducerPath]: citiesAPI.reducer,
        [itineraryAPI.reducerPath]: itineraryAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [commentAPI.reducerPath] : commentAPI.reducer,
        [activityAPI.reducerPath]: activityAPI.reducer,
        
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(citiesAPI.middleware),



})



setupListeners(store.dispatch)
export default store