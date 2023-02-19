import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { Theme } from "@mui/material";

export const appBar: SxProps<Theme> = {
  background: theme => theme.palette.common.white,
  borderBottom: theme => `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  zIndex: theme => theme.zIndex.drawer + 1,
};

export const toolBar: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  py: "8px",
};
export const userAvatarWrapper: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  flexDirection: { xs: "column", md: "row" },
};
