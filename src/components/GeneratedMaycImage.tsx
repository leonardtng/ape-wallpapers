import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectMaycDetails } from "../features/maycDetailsSlice";
import { API_CONFIG as config } from "../common/constants";
import { ipfs } from "../common/endpoints";
import { MaycTraits } from "../models";
import MaycLockscreenPlaceholderWithOverlay from "../assets/mayc/mayc-lockscreen-placeholder-with-overlay.png";
import MaycLockscreenPlaceholderNoOverlay from "../assets/mayc/mayc-lockscreen-placeholder-no-overlay.png";
import {
  selectUserInput,
  setGeneratedMaycBackground,
  setIsGeneratingMaycImage,
} from "../features/userInputSlice";
import {
  generateImage,
  getBackground,
  getLogoOverlay,
} from "../common/helpers";
import ImageLoadingState from "./UI/ImageLoadingState";

const GeneratedMaycImage: React.FC = () => {
  const dispatch = useAppDispatch();

  const maycDetails = useAppSelector(selectMaycDetails);
  const {
    imageDisplayMode,
    showLockscreenOverlay,
    isGeneratingMaycImage,
    selectedMaycId,
    generatedMaycBackground,
    selectedMaycLogoOverlay,
  } = useAppSelector(selectUserInput);

  const [withOverlay, setWithOverlay] = useState<string>(
    MaycLockscreenPlaceholderWithOverlay
  );
  const [withoutOverlay, setWithoutOverlay] = useState<string>(
    MaycLockscreenPlaceholderNoOverlay
  );

  useEffect(() => {
    dispatch(setIsGeneratingMaycImage(true));

    const maycBackground = maycDetails.value?.attributes.find(
      (trait: MaycTraits) => trait.traitType === "Background"
    )?.value;

    if (!maycBackground && !maycDetails.value?.image) {
      dispatch(setIsGeneratingMaycImage(false));
      return;
    }

    generateImage(
      `${config("ipfs").baseURL}${ipfs.maycImage(
        maycDetails.value?.image || ""
      )}`,
      getBackground("mayc", maycBackground),
      getLogoOverlay("mayc", selectedMaycLogoOverlay),
      (generatedImage: string, withoutOverlay: string, withOverlay: string) => {
        dispatch(setGeneratedMaycBackground(generatedImage));
        setWithoutOverlay(withoutOverlay);
        setWithOverlay(withOverlay);
        dispatch(setIsGeneratingMaycImage(false));
      }
    );
    // eslint-disable-next-line
  }, [dispatch, maycDetails.value?.attributes, maycDetails.value?.image]);

  return (
    <>
      {imageDisplayMode === "preview" ? (
        <Box position="relative">
          {isGeneratingMaycImage && <ImageLoadingState type="overlay" />}
          <img
            src={showLockscreenOverlay ? withOverlay : withoutOverlay}
            alt={`mayc${selectedMaycId}`}
            height={641.9}
            width={340.9}
          />
        </Box>
      ) : (
        <Box position="relative" mb={2} padding={3}>
          {isGeneratingMaycImage && <ImageLoadingState type="plain" />}
          <img
            src={generatedMaycBackground}
            alt={`mayc${selectedMaycId}`}
            height={604.75}
            width={287.75}
          />
        </Box>
      )}
    </>
  );
};

export default GeneratedMaycImage;
