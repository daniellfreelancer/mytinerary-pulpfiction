import { createSlice }  from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        role:null
    },
    reducers: {
        setStateAdmin : (state, action) => { 

            state.role = action.payload.role

        },


    }
})



export const { setStateAdmin } = adminSlice.actions

export default adminSlice.reducer