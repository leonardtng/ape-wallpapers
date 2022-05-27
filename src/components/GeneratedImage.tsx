import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectBaycMetadata } from "../features/baycMetadataSlice";
import { API_CONFIG as config } from "../common/constants";
import { ipfs } from "../common/endpoints";

const GeneratedImage = () => {
  const { selectedBaycId } = useAppSelector(selectBaycMetadata);

  return (
    <Box>
      <img
        src={`${config("ipfs").baseURL}${ipfs.baycImage(selectedBaycId)}`}
        alt={`bayc${selectedBaycId}`}
        height={500}
        width={500}
      />
    </Box>
  );
};

export default GeneratedImage;
