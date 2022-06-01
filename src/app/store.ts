import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import baycMetadataReducer from "../features/baycMetadataSlice";
import maycDetailsReducer from "../features/maycDetailsSlice";
import userInputReducer from "../features/userInputSlice";

export const store = configureStore({
  reducer: {
    baycMetadata: baycMetadataReducer,
    maycDetails: maycDetailsReducer,
    userInput: userInputReducer,
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
