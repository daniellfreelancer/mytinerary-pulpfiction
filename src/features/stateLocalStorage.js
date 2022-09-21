import { createSlice }  from "@reduxjs/toolkit";

export const statesSlice = createSlice({
    name: 'statesLocalStorage',
    initialState: false,
    reducers: {
        setStateLogin : (state, action) => {

            state = action.payload
            return state
        },


    }
})



export const { setStateLogin, setStatefalse} = statesSlice.actions

export default statesSlice.reducer