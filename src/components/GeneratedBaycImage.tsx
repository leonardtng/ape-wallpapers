import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { selectBaycMetadata } from "../features/baycMetadataSlice";
import { API_CONFIG as config } from "../common/constants";
// import { ipfs } from "../common/endpoints";
// import { Bayc } from "../models";
import BaycLockscreenPlaceholderWithOverlay from "../assets/placeholders/bayc/bayc-lockscreen-placeholder-with-overlay.png";
import BaycLockscreenPlaceholderNoOverlay from "../assets/placeholders/bayc/bayc-lockscreen-placeholder-no-overlay.png";
import {
  selectUserInput,
  setGeneratedBaycBackground,
  setIsGeneratingBaycImage,
} from "../features/userInputSlice";
import {
  fetchBaycMetadata,
  generateImage,
  getBackground,
  getLogoOverlay,
} from "../common/helpers";
import ImageLoadingState from "./UI/ImageLoadingState";
import Bayc8469 from "../assets/placeholders/bayc/bayc8469.png";
// import ErrorSnackbar from "./UI/ErrorSnackbar";
import { BaycIpfsMetadata } from "../models/api/BaycMetadata";

const GeneratedBaycImage: React.FC = () => {
  const dispatch = useAppDispatch();

  // const baycMetadata = useAppSelector(selectBaycMetadata);
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

  // const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  const [metadata, setMetadata] = useState<BaycIpfsMetadata | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleBaycMetadata = useCallback(async () => {
    dispatch(setIsGeneratingBaycImage(true));
    const response = await fetchBaycMetadata(selectedBaycId);

    if (selectedBaycId === 8469) {
      setImage(Bayc8469);
      setMetadata(response);
      return;
    }

    // Fetch the image from IPFS
    const image = await fetch(
      `${config("ipfs").baseURL}${response.image.replace("ipfs://", "")}`
    );
    const blob = await image.blob();

    // Create an Image object
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      // Create a canvas and set its dimensions
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the desired width and height
      const desiredWidth = 1262; // set your desired width
      const desiredHeight = 1262; // set your desired height

      // Resize the canvas
      canvas.width = desiredWidth;
      canvas.height = desiredHeight;

      // Draw the image onto the canvas
      ctx?.drawImage(img, 0, 0, desiredWidth, desiredHeight);

      // Convert the canvas to a base64 string
      const base64String = canvas.toDataURL();

      // Clean up
      URL.revokeObjectURL(url);

      // Return the base64 string
      setImage(base64String); // or use it in any other way
      setMetadata(response);
    };

    img.src = url;
  }, [dispatch, selectedBaycId]);

  useEffect(() => {
    handleBaycMetadata();
  }, [handleBaycMetadata]);

  useEffect(() => {
    if (!metadata || !image) return;

    const baycBackground = metadata.attributes.find(
      (trait) => trait.traitType === "Background"
    )?.value;

    if (!baycBackground) {
      dispatch(setIsGeneratingBaycImage(false));
      return;
    }

    generateImage({
      ipfsUrl: image,
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
        setImage(null);
        setMetadata(null);
      },
      customText: selectedBaycCustomText,
      leftOffset: false,
      handleImageError: (error: Error) => {
        console.error(error);
        // setErrorSnackbarOpen(true);
        dispatch(setIsGeneratingBaycImage(false));
      },
    });
  }, [
    dispatch,
    selectedBaycId,
    selectedBaycLogoOverlay,
    selectedBaycCustomText,
    metadata,
    image,
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
      {/* <ErrorSnackbar open={errorSnackbarOpen} setOpen={setErrorSnackbarOpen}>
        Unable to fetch image from IPFS, please try again later
      </ErrorSnackbar> */}
    </>
  );
};

export default GeneratedBaycImage;
