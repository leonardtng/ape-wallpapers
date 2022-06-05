import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { CoffeeRounded } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      bottom={0}
      height="64px"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{
        display: {
          md: "flex",
          xs: "block",
        },
        position: {
          md: "absolute",
          xs: "relative",
        },
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Buy me a coffee! <CoffeeRounded sx={{ height: 18 }} />
      </Typography>
      <Link
        href="https://etherscan.io/address/0x615114feb4b7e38a27e0a33bbc6619420c5f6a91"
        target="_blank"
        rel="noopener noreferrer"
      >
        0x615114Feb4B7E38a27E0A33bBC6619420c5f6a91
      </Link>
    </Box>
  );
};

export default Footer;
