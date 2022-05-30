import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { UserInputState } from "../models";
import BaycLockscreenPlaceholder from "../assets/bayc/bayc-generated-default.png";

interface Reducers extends SliceCaseReducers<UserInputState> {
  setNftMode: (
    state: UserInputState,
    action: PayloadAction<UserInputState["nftMode"]>
  ) => void;
  setImageDisplayMode: (
    state: UserInputState,
    action: PayloadAction<UserInputState["imageDisplayMode"]>
  ) => void;
  setShowLockscreenOverlay: (
    state: UserInputState,
    action: PayloadAction<UserInputState["showLockscreenOverlay"]>
  ) => void;
  setIsGeneratingImage: (
    state: UserInputState,
    action: PayloadAction<UserInputState["isGeneratingImage"]>
  ) => void;
  setSelectedBaycId: (
    state: UserInputState,
    action: PayloadAction<UserInputState["selectedBaycId"]>
  ) => void;
  setGeneratedBaycBackground: (
    state: UserInputState,
    action: PayloadAction<UserInputState["generatedBaycBackground"]>
  ) => void;
  setSelectedBaycLogoOverlay: (
    state: UserInputState,
    action: PayloadAction<UserInputState["selectedBaycLogoOverlay"]>
  ) => void;
}

const initialState: UserInputState = {
  nftMode: "bayc",
  imageDisplayMode: "preview",
  showLockscreenOverlay: true,
  isGeneratingImage: false,
  selectedBaycId: 8469,
  generatedBaycBackground: BaycLockscreenPlaceholder,
  selectedBaycLogoOverlay: "baycLogoWhite",
};

export const selectUserInput: (state: RootState) => UserInputState = (
  state: RootState
) => state.userInput;

const userInputSlice: Slice<UserInputState, Reducers, "userInput"> =
  createSlice({
    name: "userInput",
    initialState,
    reducers: {
      setNftMode: (
        state: UserInputState,
        action: PayloadAction<UserInputState["nftMode"]>
      ) => {
        state.nftMode = action.payload;
      },
      setImageDisplayMode: (
        state: UserInputState,
        action: PayloadAction<UserInputState["imageDisplayMode"]>
      ) => {
        state.imageDisplayMode = action.payload;
      },
      setShowLockscreenOverlay: (
        state: UserInputState,
        action: PayloadAction<UserInputState["showLockscreenOverlay"]>
      ) => {
        state.showLockscreenOverlay = action.payload;
      },
      setIsGeneratingImage: (
        state: UserInputState,
        action: PayloadAction<UserInputState["isGeneratingImage"]>
      ) => {
        state.isGeneratingImage = action.payload;
      },
      setSelectedBaycId: (
        state: UserInputState,
        action: PayloadAction<UserInputState["selectedBaycId"]>
      ) => {
        state.selectedBaycId = action.payload;
      },
      setGeneratedBaycBackground: (
        state: UserInputState,
        action: PayloadAction<UserInputState["generatedBaycBackground"]>
      ) => {
        state.generatedBaycBackground = action.payload;
      },
      setSelectedBaycLogoOverlay: (
        state: UserInputState,
        action: PayloadAction<UserInputState["selectedBaycLogoOverlay"]>
      ) => {
        state.selectedBaycLogoOverlay = action.payload;
      },
    },
  });

export const {
  setNftMode,
  setImageDisplayMode,
  setShowLockscreenOverlay,
  setIsGeneratingImage,
  setSelectedBaycId,
  setGeneratedBaycBackground,
  setSelectedBaycLogoOverlay,
} = userInputSlice.actions;

export default userInputSlice.reducer;
