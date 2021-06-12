import { configureStore } from '@reduxjs/toolkit'
import colorReducer from "./slice/colorSlice";

export default configureStore({
    reducer: {
        color: colorReducer
    },
})
