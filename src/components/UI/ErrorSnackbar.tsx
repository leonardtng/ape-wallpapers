import React, { useEffect, useState } from "react";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectBaycMetadata } from "../../features/baycMetadataSlice";
import { selectMaycDetails } from "../../features/maycDetailsSlice";

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

const ErrorSnackbar = () => {
  const baycMetadata = useAppSelector(selectBaycMetadata);
  const maycDetails = useAppSelector(selectMaycDetails);

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (baycMetadata.status === "FAILED") {
      setOpen(true);
    }
  }, [baycMetadata.status]);

  useEffect(() => {
    if (maycDetails.status === "FAILED") {
      setOpen(true);
    }
  }, [maycDetails.status]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert severity="error">
        Unable to fetch metadata, please try again later
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
