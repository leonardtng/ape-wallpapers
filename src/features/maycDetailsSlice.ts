import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { bayc as API } from "../common/endpoints";
import { API_CONFIG as config } from "../common/constants";
import { MaycDetails, MaycDetailsState } from "../models";
import { toCamelCase } from "../common/helpers";

const initialState: MaycDetailsState = {
  value: null,
  status: "IDLE",
};

export const fetchMaycDetails = createAsyncThunk(
  "maycDetails",
  async (maycId: number) => {
    const canceler = axios.CancelToken.source();

    const response = await axios.request({
      ...config("bayc"),
      url: API.maycDetails(maycId),
      cancelToken: canceler.token,
    });

    const normalizedResponse = toCamelCase(response.data) as MaycDetails;
    normalizedResponse.image = normalizedResponse.image.slice(7);
    return normalizedResponse as MaycDetails;
  }
);

export const selectMaycDetails: (state: RootState) => MaycDetailsState = (
  state: RootState
) => state.maycDetails;

const maycDetailsSlice: Slice<MaycDetailsState, {}, "maycDetails"> =
  createSlice({
    name: "maycDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMaycDetails.pending, (state) => {
          state.status = "LOADING";
        })
        .addCase(fetchMaycDetails.fulfilled, (state, action) => {
          state.status = "IDLE";
          state.value = action.payload;
        })
        .addCase(fetchMaycDetails.rejected, (state, action) => {
          state.status = "FAILED";
          state.error = action.error.message;
        });
    },
  });

export default maycDetailsSlice.reducer;
