import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingVisible: false
}

const loadingSlice = createSlice({
    name: "loading",
    initialState, 

    reducers: {
        openLoaderSlice: (slice) => {
            slice.isLoadingVisible = true
        },

        closeLoaderSLice: (slice) => {
            slice.isLoadingVisible = false
        },

        toggleLoaderSLice: (slice) => {
            slice.isLoadingVisible= !slice.isLoadingVisible
        }
    }
})

export const { openLoaderSlice, closeLoaderSLice} = loadingSlice.actions
export default loadingSlice