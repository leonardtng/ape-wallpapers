import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";
import { ipfs as API } from "../common/endpoints";
import { API_CONFIG as config } from "../common/constants";
import { BaycMetadata, BaycMetadataState } from "../models";
import { cacheWithExpiry, retrieveCache, toCamelCase } from "../common/helpers";

interface Reducers extends SliceCaseReducers<BaycMetadataState> {
  setSelectedBaycId: (
    state: BaycMetadataState,
    action: PayloadAction<number>
  ) => void;
}

const initialState: BaycMetadataState = {
  value: null,
  status: "IDLE",
  selectedBaycId: 8469,
};

export const fetchBaycMetadata = createAsyncThunk("baycMetadata", async () => {
  const canceler = axios.CancelToken.source();

  const cachedData: BaycMetadata | null = retrieveCache("baycMetadata");

  if (cachedData) {
    return cachedData as BaycMetadata;
  } else {
    const response = await axios.request({
      ...config("ipfs"),
      url: API.baycMetadata,
      cancelToken: canceler.token,
    });

    const normalizedResponse = toCamelCase(response.data);
    cacheWithExpiry("baycMetadata", normalizedResponse, 10e11); // Cache Period: 10 minutes

    return normalizedResponse as BaycMetadata;
  }
});

export const selectBaycMetadata: (state: RootState) => BaycMetadataState = (
  state: RootState
) => state.baycMetadata;

const baycMetadataSlice: Slice<BaycMetadataState, Reducers, "baycMetadata"> =
  createSlice({
    name: "baycMetadata",
    initialState,
    reducers: {
      setSelectedBaycId: (
        state: BaycMetadataState,
        action: PayloadAction<number>
      ) => {
        state.selectedBaycId = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBaycMetadata.pending, (state) => {
          state.status = "LOADING";
        })
        .addCase(fetchBaycMetadata.fulfilled, (state, action) => {
          state.status = "IDLE";
          state.value = action.payload;
        })
        .addCase(fetchBaycMetadata.rejected, (state, action) => {
          state.status = "FAILED";
          state.error = action.error.message;
        });
    },
  });

export const { setSelectedBaycId } = baycMetadataSlice.actions;

export default baycMetadataSlice.reducer;
