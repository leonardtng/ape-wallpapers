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
import BaycLockscreenOverlay from "../assets/bayc-lockscreen-overlay.png";
import BaycLockscreenPlaceholder from "../assets/bayc-lockscreen-placeholder.png";

const GeneratedImage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const baycMetadata = useAppSelector(selectBaycMetadata);
  const { isGeneratingImage, selectedBaycId, showLockscreenOverlay } =
    useAppSelector(selectUserInput);

  const [mergedImage, setMergedImage] = useState(BaycLockscreenPlaceholder);
  const [withLockscreenOverlay, setWithLockscreenOverlay] = useState("");

  useEffect(() => {
    dispatch(setIsGeneratingImage(true));

    const baycBackground = baycMetadata.value?.collection.find(
      (bayc: Bayc) => bayc.tokenId === selectedBaycId
    )?.traits.background;
    console.log(
      baycMetadata.value?.collection.find(
        (bayc: Bayc) => bayc.tokenId === selectedBaycId
      )
    );
    if (!baycBackground) {
      dispatch(setIsGeneratingImage(false));
      return;
    }

    function toDataURL(url: string, callback: any) {
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
      function (dataUrl: any) {
        mergeImages(
          [
            {
              src: getBackground("bayc", baycBackground),
              x: 0,
              y: 0,
            },
            {
              src: dataUrl,
              x: -56,
              y: 1157,
            },
          ],
          { width: 1150, height: 2418.5 }
        ).then((b64) => {
          setMergedImage(b64);
          dispatch(setIsGeneratingImage(false));

          mergeImages(
            [
              {
                src: b64,
                x: 0,
                y: 0,
              },
              {
                src: BaycLockscreenOverlay,
                x: 0,
                y: 0,
              },
            ],
            { width: 1150, height: 2418.5 }
          ).then((b64) => {
            setWithLockscreenOverlay(b64);
          });
        });
      }
    );
  }, [dispatch, mergedImage, selectedBaycId, baycMetadata.value?.collection]);

  return (
    <Box height={663.5} width={315.5}>
      {(isGeneratingImage || mergedImage.length === 0) && (
        <Box
          height={663.5}
          width={315.5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          sx={{ backgroundColor: `${theme.palette.background.paper}BB` }}
        >
          <CircularProgress />
        </Box>
      )}
      <img
        src={showLockscreenOverlay ? withLockscreenOverlay : mergedImage}
        alt={`bayc${selectedBaycId}`}
        height={663.5}
        width={315.5}
      />
    </Box>
  );
};

export default GeneratedImage;
