import { FC } from "react";

import { Stack, Theme, Typography } from "@mui/material";
import { CheckRounded } from "@mui/icons-material";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";

const iconSize: SxProps<Theme> = {
  fontSize: "17px",
};

interface PasswordCheckerProps {
  password: string;
  error: boolean;
}

const PasswordChecker: FC<PasswordCheckerProps> = ({ password, error }) => {
  const eightCharColor = password.length > 7 ? "primary" : error ? "error" : "text.secondary";
  const upperCaseColor = !!password.match(/[A-Z]/) ? "primary" : error ? "error" : "text.secondary";
  const numberColor = !!password.match(/\d/) ? "primary" : error ? "error" : "text.secondary";
  const specialCharColor = !!password.match(/[!@#$%^&*]/) ? "primary" : error ? "error" : "text.secondary";

  return (
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ marginBottom: "15px" }}>
      <div>
        <Typography color={eightCharColor}>
          <CheckRounded sx={iconSize} /> At least 8 characters
        </Typography>
        <Typography color={upperCaseColor}>
          <CheckRounded sx={iconSize} /> At least 1 upper case letter
        </Typography>
      </div>
      <div>
        <Typography color={numberColor}>
          <CheckRounded sx={iconSize} /> At least 1 number
        </Typography>
        <Typography color={specialCharColor}>
          <CheckRounded sx={iconSize} /> At least 1 special character ! @ # $ ~
        </Typography>
      </div>
    </Stack>
  );
};

export default PasswordChecker;
