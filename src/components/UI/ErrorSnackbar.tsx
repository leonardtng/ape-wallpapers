import React, { useEffect } from "react";
import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectBaycMetadata } from "../../features/baycMetadataSlice";
import { selectMaycDetails } from "../../features/maycDetailsSlice";

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const ErrorSnackbar: React.FC<Props> = ({ open, setOpen, children }: Props) => {
  const baycMetadata = useAppSelector(selectBaycMetadata);
  const maycDetails = useAppSelector(selectMaycDetails);

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
  }, [baycMetadata.status, setOpen]);

  useEffect(() => {
    if (maycDetails.status === "FAILED") {
      setOpen(true);
    }
  }, [maycDetails.status, setOpen]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert severity="error">{children}</Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
