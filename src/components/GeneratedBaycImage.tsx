import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBaycMetadata } from "../features/baycMetadataSlice";
import { API_CONFIG as config } from "../common/constants";
import { ipfs } from "../common/endpoints";
import { Bayc } from "../models";
import BaycLockscreenPlaceholderWithOverlay from "../assets/placeholders/bayc/bayc-lockscreen-placeholder-with-overlay.png";
import BaycLockscreenPlaceholderNoOverlay from "../assets/placeholders/bayc/bayc-lockscreen-placeholder-no-overlay.png";
import {
  selectUserInput,
  setGeneratedBaycBackground,
  setIsGeneratingBaycImage,
} from "../features/userInputSlice";
import {
  generateImage,
  getBackground,
  getLogoOverlay,
} from "../common/helpers";
import ImageLoadingState from "./UI/ImageLoadingState";
import Bayc8469 from "../assets/placeholders/bayc/bayc8469.png";

const GeneratedBaycImage: React.FC = () => {
  const dispatch = useAppDispatch();

  const baycMetadata = useAppSelector(selectBaycMetadata);
  const {
    imageDisplayMode,
    showLockscreenOverlay,
    isGeneratingBaycImage,
    selectedBaycId,
    generatedBaycBackground,
    selectedBaycLogoOverlay,
    selectedBaycCustomText,
  } = useAppSelector(selectUserInput);

  const [withOverlay, setWithOverlay] = useState<string>(
    BaycLockscreenPlaceholderWithOverlay
  );
  const [withoutOverlay, setWithoutOverlay] = useState<string>(
    BaycLockscreenPlaceholderNoOverlay
  );

  useEffect(() => {
    dispatch(setIsGeneratingBaycImage(true));

    const baycBackground = baycMetadata.value?.collection.find(
      (bayc: Bayc) => bayc.tokenId === selectedBaycId
    )?.traits.background;

    if (!baycBackground) {
      dispatch(setIsGeneratingBaycImage(false));
      return;
    }

    generateImage({
      ipfsUrl:
        selectedBaycId === 8469
          ? Bayc8469
          : `${config("ipfs").baseURL}${ipfs.baycImage(selectedBaycId)}`,
      background: getBackground("bayc", baycBackground),
      overlay: getLogoOverlay("bayc", selectedBaycLogoOverlay),
      handleResults: (
        generatedImage: string,
        withoutOverlay: string,
        withOverlay: string
      ) => {
        dispatch(setGeneratedBaycBackground(generatedImage));
        setWithoutOverlay(withoutOverlay);
        setWithOverlay(withOverlay);
        dispatch(setIsGeneratingBaycImage(false));
      },
      customText: selectedBaycCustomText,
      leftOffset: false,
    });
  }, [
    dispatch,
    selectedBaycId,
    baycMetadata.value?.collection,
    selectedBaycLogoOverlay,
    selectedBaycCustomText,
  ]);

  return (
    <>
      {imageDisplayMode === "preview" ? (
        <Box position="relative">
          {isGeneratingBaycImage && <ImageLoadingState type="overlay" />}
          <img
            src={showLockscreenOverlay ? withOverlay : withoutOverlay}
            alt={`bayc${selectedBaycId}`}
            height={641.9}
            width={340.9}
          />
        </Box>
      ) : (
        <Box position="relative" padding={3}>
          {isGeneratingBaycImage && <ImageLoadingState type="plain" />}
          <img
            src={generatedBaycBackground}
            alt={`bayc${selectedBaycId}`}
            height={604.75}
            width={287.75}
          />
        </Box>
      )}
    </>
  );
};

export default GeneratedBaycImage;
