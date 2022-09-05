import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import citiesSlice from './features/citiesSlice'
import citiesAPI  from './features/citiesAPI'

export const store = configureStore({
    reducer: {
        cities: citiesSlice,

        [citiesAPI.reducerPath]: citiesAPI.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(citiesAPI.middleware),


    
})



setupListeners(store.dispatch)
export default store