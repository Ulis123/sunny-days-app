import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material";

export const wrapper: SxProps<Theme> = {
  minHeight: "100vh",
  bgcolor: "common.white",
  position: "relative",
  zIndex: 0,
};
export const container: SxProps<Theme> = {
  minHeight: "inherit",
  position: "relative",
  zIndex: 1,
};

export const stack: SxProps<Theme> = {
  minHeight: "inherit",
};

export const formStack: SxProps<Theme> = {
  width: "100%",
};
export const paper: SxProps<Theme> = {
  p: "64px 40px",
  my: "24px",
  flexBasis: { xs: "100%", md: "50%" },
};
export const signUpTitle: SxProps<Theme> = {
  mb: { xs: "20px", sm: "40px" },
  width: { xs: "100%", sm: "auto" },
};
export const submitButton: SxProps<Theme> = {
  my: "15px",
};
