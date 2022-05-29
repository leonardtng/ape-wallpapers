import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { UserInputState } from "../models";

interface Reducers extends SliceCaseReducers<UserInputState> {
  setIsGeneratingImage: (
    state: UserInputState,
    action: PayloadAction<boolean>
  ) => void;
  setSelectedBaycId: (
    state: UserInputState,
    action: PayloadAction<number>
  ) => void;
  setShowLockscreenOverlay: (
    state: UserInputState,
    action: PayloadAction<boolean>
  ) => void;
}

const initialState: UserInputState = {
  isGeneratingImage: false,
  selectedBaycId: 8469,
  showLockscreenOverlay: true,
};

export const selectUserInput: (state: RootState) => UserInputState = (
  state: RootState
) => state.userInput;

const userInputSlice: Slice<UserInputState, Reducers, "userInput"> =
  createSlice({
    name: "userInput",
    initialState,
    reducers: {
      setIsGeneratingImage: (
        state: UserInputState,
        action: PayloadAction<boolean>
      ) => {
        state.isGeneratingImage = action.payload;
      },
      setSelectedBaycId: (
        state: UserInputState,
        action: PayloadAction<number>
      ) => {
        state.selectedBaycId = action.payload;
      },
      setShowLockscreenOverlay: (
        state: UserInputState,
        action: PayloadAction<boolean>
      ) => {
        state.showLockscreenOverlay = action.payload;
      },
    },
  });

export const {
  setIsGeneratingImage,
  setSelectedBaycId,
  setShowLockscreenOverlay,
} = userInputSlice.actions;

export default userInputSlice.reducer;
