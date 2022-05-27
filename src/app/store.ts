import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import baycMetadataReducer from "../features/baycMetadataSlice";

export const store = configureStore({
  reducer: {
    baycMetadata: baycMetadataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
