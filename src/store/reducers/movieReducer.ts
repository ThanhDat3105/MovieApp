import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../utils/api";
export interface MovieState {
  url: any;
  loading: Boolean;
  genRes: any;
}

const DEFAULT_STATE = {
  url: {},
  loading: true,
  genRes: [],
} as MovieState;

export const fetchApiConfigurationAction = createAsyncThunk(
  "movieReducer/getApiConfigurationAction",
  async () => {
    const res = await fetchDataFromApi("/configuration");

    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original",
    };

    return url;
  }
);

export const fetchApiGenresAction = createAsyncThunk(
  "movieReducer/getApiGenresAction",
  async (data: any) => {
    const result = data;

    return result;
  }
);

const movieSlice = createSlice({
  name: "movieReducer",
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchApiConfigurationAction.fulfilled,
      (state: MovieState, action: PayloadAction<any>) => {
        state.url = action.payload;
      }
    );

    builder.addCase(
      fetchApiGenresAction.fulfilled,
      (state: MovieState, action: PayloadAction<any>) => {
        state.genRes = action.payload;
      }
    );
  },
});

export const movieReducer = movieSlice.reducer;
export const movieActions = movieSlice.actions;
