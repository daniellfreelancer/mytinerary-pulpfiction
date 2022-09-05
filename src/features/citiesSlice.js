import { createSlice } from '@reduxjs/toolkit'


export const citiesSlice = createSlice({


    name: 'cities',

    initialState: {
        cities: []
    },

    reducers:{
        fetchFromServer: (state) => {
            state.cities = [
                {
                    //objeto vacio

                    city: "Bora Bora Island",
                    country: "Tahiti",
                    featuredLocation : "Matira Beach",
                    photo: "https://i.im.ge/2022/08/31/OE8fih.boraBora.png",
                    fundation: "1722-01-01",
                    description: "Bora Bora island will make you feel love at first sight. With ocean vi…",
                    smalldescription: "This south pacific island could easily be defined as the center of the…",
                    population: 10605

                }
            ]
        }
    }
})

export const {fetchFromServer} = citiesSlice.actions

export default citiesSlice.reducer
