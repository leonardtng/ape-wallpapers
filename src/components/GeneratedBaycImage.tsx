import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectBaycMetadata } from "../features/baycMetadataSlice";
import { API_CONFIG as config } from "../common/constants";
import { ipfs } from "../common/endpoints";
import { Bayc } from "../models";
import BaycLockscreenPlaceholderWithOverlay from "../assets/bayc/bayc-lockscreen-placeholder-with-overlay.png";
import BaycLockscreenPlaceholderNoOverlay from "../assets/bayc/bayc-lockscreen-placeholder-no-overlay.png";
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
import {
  LockscreenOverlayLoadingState,
  PlainImageLoadingState,
} from "./UI/ImageLoadingStates";

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

    generateImage(
      `${config("ipfs").baseURL}${ipfs.baycImage(selectedBaycId)}`,
      getBackground("bayc", baycBackground),
      getLogoOverlay("bayc", selectedBaycLogoOverlay),
      (generatedImage: string, withoutOverlay: string, withOverlay: string) => {
        dispatch(setGeneratedBaycBackground(generatedImage));
        setWithoutOverlay(withoutOverlay);
        setWithOverlay(withOverlay);
        dispatch(setIsGeneratingBaycImage(false));
      }
    );
  }, [
    dispatch,
    selectedBaycId,
    baycMetadata.value?.collection,
    selectedBaycLogoOverlay,
  ]);

  return (
    <>
      {imageDisplayMode === "preview" ? (
        <Box position="relative">
          {isGeneratingBaycImage && <LockscreenOverlayLoadingState />}
          <img
            src={showLockscreenOverlay ? withOverlay : withoutOverlay}
            alt={`bayc${selectedBaycId}`}
            height={641.9}
            width={340.9}
          />
        </Box>
      ) : (
        <Box position="relative" mb={2} padding={3}>
          {isGeneratingBaycImage && <PlainImageLoadingState />}
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
