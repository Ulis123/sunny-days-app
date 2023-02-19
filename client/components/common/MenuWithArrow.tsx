import { FC, PropsWithChildren, MouseEvent } from "react";

import { Menu, Theme } from "@mui/material";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { PopoverOrigin } from "@mui/material/Popover/Popover";

const popperStyles: SxProps<Theme> = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

const defaultTransformOrigin: PopoverOrigin = {
  horizontal: "right",
  vertical: "top",
};
const defaultAnchorOrigin: PopoverOrigin = {
  horizontal: "right",
  vertical: "bottom",
};

interface MenuWithArrowProps {
  anchorEl: HTMLElement | undefined;
  onClose: (event: MouseEvent<HTMLElement>) => void;
  onClick: () => void;
  transformOrigin?: PopoverOrigin;
  anchorOrigin?: PopoverOrigin;
}

const MenuWithArrow: FC<PropsWithChildren<MenuWithArrowProps>> = ({
  children,
  anchorEl,
  onClose,
  onClick,
  transformOrigin = defaultTransformOrigin,
  anchorOrigin = defaultAnchorOrigin,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={onClose}
      onClick={onClick}
      PaperProps={{ sx: popperStyles, elevation: 1 }}
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
    >
      {children}
    </Menu>
  );
};

export default MenuWithArrow;
