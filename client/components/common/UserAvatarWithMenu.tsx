import { FC } from "react";
import { signOut } from "next-auth/react";

import { AccountCircleOutlined, Logout } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, MenuItem, Theme } from "@mui/material";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";

import useMenuState from "hooks/useMenuState";
import { MenuWithArrow } from "components/common";

const avatar: SxProps<Theme> = {
  width: 40,
  height: 40,
  bgcolor: "transparent",
};
const avatarIcon: SxProps<Theme> = {
  fontSize: 40,
  color: "action.active",
};
const UserAvatarWithMenu: FC = () => {
  const [anchorEl, handleClick, handleClose] = useMenuState();

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar sx={avatar}>
          <AccountCircleOutlined sx={avatarIcon} />
        </Avatar>
      </IconButton>
      <MenuWithArrow anchorEl={anchorEl} onClose={handleClose} onClick={handleClose}>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </MenuWithArrow>
    </>
  );
};

export default UserAvatarWithMenu;
