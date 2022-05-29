import React, { useEffect, useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { API_CONFIG as config } from "../common/constants";
import { ipfs } from "../common/endpoints";
import mergeImages from "merge-images";
import {
  selectUserInput,
  setIsGeneratingImage,
} from "../features/userInputSlice";
import { selectBaycMetadata } from "../features/baycMetadataSlice";
import { getBackground } from "../common/helpers";
import { Bayc } from "../models";
import BaycLockscreenPlaceholder from "../assets/bayc-lockscreen-placeholder.png";
import Mockup from "../assets/mockup.png";
import Overlay from "../assets/overlay.png";

const GeneratedImage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const baycMetadata = useAppSelector(selectBaycMetadata);
  const { isGeneratingImage, selectedBaycId, showLockscreenOverlay } =
    useAppSelector(selectUserInput);

  const [generatedBackground, setGeneratedBackground] = useState(
    BaycLockscreenPlaceholder
  );
  const [withLockscreenOverlay, setWithLockscreenOverlay] = useState(
    BaycLockscreenPlaceholder
  );
  const [withoutLockscreenOverlay, setWithoutLockscreenOverlay] = useState(
    BaycLockscreenPlaceholder
  );

  useEffect(() => {
    dispatch(setIsGeneratingImage(true));

    const baycBackground = baycMetadata.value?.collection.find(
      (bayc: Bayc) => bayc.tokenId === selectedBaycId
    )?.traits.background;

    if (!baycBackground) {
      dispatch(setIsGeneratingImage(false));
      return;
    }

    function toDataURL(
      url: string,
      callback: (result: string | ArrayBuffer | null) => void
    ) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
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
          ],
          { width: 1150, height: 2418.5 }
        ).then((b64) => {
          setGeneratedBackground(b64);
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
            setWithoutLockscreenOverlay(b64);
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
              setWithLockscreenOverlay(b64);
              dispatch(setIsGeneratingImage(false));
            });
          });
        });
      }
    );
  }, [
    dispatch,
    generatedBackground,
    selectedBaycId,
    baycMetadata.value?.collection,
  ]);

  return (
    <Box height={641.9} width={340.9} position="relative">
      {(isGeneratingImage || generatedBackground.length === 0) && (
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
        src={
          showLockscreenOverlay
            ? withLockscreenOverlay
            : withoutLockscreenOverlay
        }
        alt={`bayc${selectedBaycId}`}
        height={641.9}
        width={340.9}
      />
    </Box>
  );
};

export default GeneratedImage;
