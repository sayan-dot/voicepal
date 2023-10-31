import { configureStore } from "@reduxjs/toolkit";
import speechReducer from './features/speechRecognitionSlice'

export const store=configureStore({
    reducer:{
        speech:speechReducer
    }
})