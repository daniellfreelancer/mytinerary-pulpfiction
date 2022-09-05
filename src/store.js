import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import citiesAPI  from './features/citiesAPI'

export const store = configureStore({
    reducer: {
        [citiesAPI.reducerPath]: citiesAPI.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(citiesAPI.middleware),


    
})



setupListeners(store.dispatch)
export default store