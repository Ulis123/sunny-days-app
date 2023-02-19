import { CSSProperties, FC } from "react";

import { Box, CircularProgress } from "@mui/material";

import { FOOTER_HEIGHT, HEADER_HEIGHT } from "constants/globals";

interface PageLoadingSpinnerProps {
  blockHeight?: CSSProperties["height"];
  blockWidth?: CSSProperties["width"];
}

const PageLoadingSpinner: FC<PageLoadingSpinnerProps> = ({
  blockHeight = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
  blockWidth = "100vw",
}) => {
  return (
    <Box
      sx={{
        height: blockHeight,
        width: blockWidth,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default PageLoadingSpinner;
