import { MouseEvent, useState } from "react";

type Anchor = HTMLElement | undefined;
type HandleClick = (event: MouseEvent<HTMLElement>) => void;

const useMenuState = (): [Anchor, HandleClick, () => void] => {
  const [anchorEl, setAnchorEl] = useState<Anchor>();
  const handleClick: HandleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return [anchorEl, handleClick, handleClose];
};

export default useMenuState;
