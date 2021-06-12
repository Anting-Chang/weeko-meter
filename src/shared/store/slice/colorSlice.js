import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'color',
    initialState: {
        value: {
            weekColor: [
                "#d8f3dc",
                "#95d5b2",
                "#52b788",
                "#2d6a4f"
            ],
            quarterColor: [
                "#e0aaff",
                "#c77dff",
                "#9d4edd",
                "#7b2cbf"
            ],
            yearColor: [
                "#fae0e4",
                "#f9bec7",
                "#ff99ac",
                "#ff5c8a"
            ],
        },
    },
    reducers: {
        changeWeekColor: (state, action) => {
            state.value.weekColor = action.payload
        },
        changeQuarterColor: (state, action) => {
            state.value.quarterColor = action.payload
        },
        changeYearColor: (state, action) => {
            state.value.yearColor = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { changeWeekColor, changeQuarterColor, changeYearColor } = slice.actions

export const selectColor = state => state.color.value;

export default slice.reducer
