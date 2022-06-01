import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { UserInputState } from "../models";
import BaycLockscreenPlaceholder from "../assets/bayc/bayc-generated-default.png";
import MaycLockscreenPlaceholder from "../assets/mayc/mayc-generated-default.png";

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

  setIsGeneratingBaycImage: (
    state: UserInputState,
    action: PayloadAction<UserInputState["isGeneratingBaycImage"]>
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

  setIsGeneratingMaycImage: (
    state: UserInputState,
    action: PayloadAction<UserInputState["isGeneratingMaycImage"]>
  ) => void;
  setSelectedMaycId: (
    state: UserInputState,
    action: PayloadAction<UserInputState["selectedMaycId"]>
  ) => void;
  setGeneratedMaycBackground: (
    state: UserInputState,
    action: PayloadAction<UserInputState["generatedMaycBackground"]>
  ) => void;
  setSelectedMaycLogoOverlay: (
    state: UserInputState,
    action: PayloadAction<UserInputState["selectedMaycLogoOverlay"]>
  ) => void;
}

const initialState: UserInputState = {
  nftMode: "bayc",
  imageDisplayMode: "preview",
  showLockscreenOverlay: true,
  isGeneratingBaycImage: false,
  selectedBaycId: 8469,
  generatedBaycBackground: BaycLockscreenPlaceholder,
  selectedBaycLogoOverlay: "baycLogoWhite",
  isGeneratingMaycImage: false,
  selectedMaycId: 0,
  generatedMaycBackground: MaycLockscreenPlaceholder,
  selectedMaycLogoOverlay: "maycLogoSlime",
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

      setIsGeneratingBaycImage: (
        state: UserInputState,
        action: PayloadAction<UserInputState["isGeneratingBaycImage"]>
      ) => {
        state.isGeneratingBaycImage = action.payload;
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

      setIsGeneratingMaycImage: (
        state: UserInputState,
        action: PayloadAction<UserInputState["isGeneratingMaycImage"]>
      ) => {
        state.isGeneratingMaycImage = action.payload;
      },
      setSelectedMaycId: (
        state: UserInputState,
        action: PayloadAction<UserInputState["selectedMaycId"]>
      ) => {
        state.selectedMaycId = action.payload;
      },
      setGeneratedMaycBackground: (
        state: UserInputState,
        action: PayloadAction<UserInputState["generatedMaycBackground"]>
      ) => {
        state.generatedMaycBackground = action.payload;
      },
      setSelectedMaycLogoOverlay: (
        state: UserInputState,
        action: PayloadAction<UserInputState["selectedMaycLogoOverlay"]>
      ) => {
        state.selectedMaycLogoOverlay = action.payload;
      },
    },
  });

export const {
  setNftMode,
  setImageDisplayMode,
  setShowLockscreenOverlay,

  setIsGeneratingBaycImage,
  setSelectedBaycId,
  setGeneratedBaycBackground,
  setSelectedBaycLogoOverlay,

  setIsGeneratingMaycImage,
  setSelectedMaycId,
  setGeneratedMaycBackground,
  setSelectedMaycLogoOverlay,
} = userInputSlice.actions;

export default userInputSlice.reducer;
