import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export const cardContentMain: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  mb: "15px",
};

export const cardContentImageWrapper: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
export const secondaryFieldsWrapper: SxProps<Theme> = {
  display: "flex",
};
export const daysStack: SxProps<Theme> = {
  px: "15px",
  py: "10px",
  alignItems: "center",
};
