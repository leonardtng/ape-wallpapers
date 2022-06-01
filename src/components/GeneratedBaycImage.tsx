import React, { useEffect, useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { API_CONFIG as config } from "../common/constants";
import { ipfs } from "../common/endpoints";
import mergeImages from "merge-images";
import {
  selectUserInput,
  setGeneratedBaycBackground,
  setIsGeneratingBaycImage,
} from "../features/userInputSlice";
import { selectBaycMetadata } from "../features/baycMetadataSlice";
import { getBackground, getLogoOverlay, toDataURL } from "../common/helpers";
import { Bayc } from "../models";
import BaycLockscreenPlaceholderWithOverlay from "../assets/bayc/bayc-lockscreen-placeholder-with-overlay.png";
import BaycLockscreenPlaceholderNoOverlay from "../assets/bayc/bayc-lockscreen-placeholder-no-overlay.png";

import Mockup from "../assets/mockup.png";
import Overlay from "../assets/overlay.png";
import ImageDisplayModeToggle from "./ImageDisplayModeToggle";

const GeneratedBaycImage: React.FC = () => {
  const theme = useTheme();
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

    toDataURL(
      `${config("ipfs").baseURL}${ipfs.baycImage(selectedBaycId)}`,
      function (dataUrl: string | ArrayBuffer | null) {
        mergeImages(
          [
            {
              src: getBackground("bayc", baycBackground),
              x: 0,
              y: 0,
            },
            {
              src: dataUrl as string,
              x: -56,
              y: 1157,
            },
            ...(selectedBaycLogoOverlay !== "none"
              ? [
                  {
                    src: getLogoOverlay("bayc", selectedBaycLogoOverlay),
                    x: 0,
                    y: 0,
                  },
                ]
              : []),
          ],
          { width: 1151, height: 2419 }
        ).then((b64) => {
          dispatch(setGeneratedBaycBackground(b64));
          mergeImages([
            {
              src: b64,
              x: 155,
              y: 166,
            },
            {
              src: Mockup,
              x: 0,
              y: 0,
            },
          ]).then((b64) => {
            setWithoutOverlay(b64);
            mergeImages([
              {
                src: b64,
                x: 0,
                y: 0,
              },
              {
                src: Overlay,
                x: 0,
                y: 0,
              },
            ]).then((b64) => {
              setWithOverlay(b64);
              dispatch(setIsGeneratingBaycImage(false));
            });
          });
        });
      }
    );
  }, [
    dispatch,
    selectedBaycId,
    baycMetadata.value?.collection,
    selectedBaycLogoOverlay,
  ]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="430px"
    >
      {imageDisplayMode === "preview" ? (
        <Box position="relative">
          {isGeneratingBaycImage && (
            <Box
              height={562}
              width={259}
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              sx={{
                backgroundColor: `${theme.palette.background.paper}BB`,
                top: "39px",
                left: "41px",
                borderRadius: "26px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <img
            src={showLockscreenOverlay ? withOverlay : withoutOverlay}
            alt={`bayc${selectedBaycId}`}
            height={641.9}
            width={340.9}
          />
        </Box>
      ) : (
        <Box position="relative" mb={2} padding={3}>
          {isGeneratingBaycImage && (
            <Box
              height={604.75}
              width={287.75}
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              sx={{
                backgroundColor: `${theme.palette.background.paper}BB`,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <img
            src={generatedBaycBackground}
            alt={`bayc${selectedBaycId}`}
            height={604.75}
            width={287.75}
          />
        </Box>
      )}
      <ImageDisplayModeToggle />
    </Box>
  );
};

export default GeneratedBaycImage;
