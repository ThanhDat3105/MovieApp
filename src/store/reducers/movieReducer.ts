import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface MovieState {
  totalNumber: number;
}

const DEFAULT_STATE = {
  totalNumber: 0,
} as MovieState;

const movieSlice = createSlice({
  name: "movieReducer",
  initialState: DEFAULT_STATE,
  reducers: {
    handleIncreaseNumber(state: MovieState) {
      state.totalNumber += 1;
    },
  },
});

export const movieReducer = movieSlice.reducer;
export const movieActions = movieSlice.actions;
