import React, { useEffect, useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { API_CONFIG as config } from "../common/constants";
import { ipfs } from "../common/endpoints";
import mergeImages from "merge-images";
import {
  selectUserInput,
  setGeneratedMaycBackground,
  setIsGeneratingMaycImage,
} from "../features/userInputSlice";
import { getBackground, getLogoOverlay, toDataURL } from "../common/helpers";
import { MaycTraits } from "../models";
import MaycLockscreenPlaceholderWithOverlay from "../assets/mayc/mayc-lockscreen-placeholder-with-overlay.png";
import MaycLockscreenPlaceholderNoOverlay from "../assets/mayc/mayc-lockscreen-placeholder-no-overlay.png";
import Mockup from "../assets/mockup.png";
import Overlay from "../assets/overlay.png";
import { selectMaycDetails } from "../features/maycDetailsSlice";

const GeneratedMaycImage: React.FC = () => {
  const theme = useTheme();
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

    toDataURL(
      `${config("ipfs").baseURL}${ipfs.maycImage(
        maycDetails.value?.image || ""
      )}`,
      function (dataUrl: string | ArrayBuffer | null) {
        mergeImages(
          [
            {
              src: getBackground("mayc", maycBackground),
              x: 0,
              y: 0,
            },
            {
              src: dataUrl as string,
              x: -56,
              y: 1157,
            },
            ...(selectedMaycLogoOverlay !== "none"
              ? [
                  {
                    src: getLogoOverlay("mayc", selectedMaycLogoOverlay),
                    x: 0,
                    y: 0,
                  },
                ]
              : []),
          ],
          { width: 1151, height: 2419 }
        ).then((b64) => {
          dispatch(setGeneratedMaycBackground(b64));
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
              dispatch(setIsGeneratingMaycImage(false));
            });
          });
        });
      }
    );
  }, [
    dispatch,
    maycDetails.value?.attributes,
    maycDetails.value?.image,
    selectedMaycLogoOverlay,
  ]);

  return (
    <>
      {imageDisplayMode === "preview" ? (
        <Box position="relative">
          {isGeneratingMaycImage && (
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
            alt={`mayc${selectedMaycId}`}
            height={641.9}
            width={340.9}
          />
        </Box>
      ) : (
        <Box position="relative" mb={2} padding={3}>
          {isGeneratingMaycImage && (
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
