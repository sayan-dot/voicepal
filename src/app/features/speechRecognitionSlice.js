import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  text: "",
  apiResponces: "",
  loading: false,
  error: null,
};

export const getApiMessage = createAsyncThunk("getApiMessage", async (text) => {
  const response = await axios.request({
    method: "POST",
    url: "https://api.cohere.ai/v1/generate",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    data: {
      max_tokens: 200,
      truncate: "END",
      return_likelihoods: "NONE",
      prompt: text,
    },
  });
  return response.data;
});

export const speechSlice = createSlice({
  name: "speech",
  initialState,
  reducers: {
    sliceText: (state, { payload }) => {
      state.text = payload.text;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApiMessage.pending, (state, action) => {
      state.loading = true;
      console.log("Pending...");
    });

    builder.addCase(getApiMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.apiResponces = action.payload.generations[0].text;
      console.log("Fulfilled...");
    });

    builder.addCase(getApiMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("Rejected...");
    });
  },
});

export const { sliceText } = speechSlice.actions;

export default speechSlice.reducer;
