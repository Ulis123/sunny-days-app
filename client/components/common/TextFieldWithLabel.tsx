import { FC, useState } from "react";

import { Box, Theme, TextFieldProps, Typography, Collapse, InputAdornment, IconButton } from "@mui/material";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";

import StyledAlert from "./StyledAlert";
import StyledTextField from "./StyledTextField";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const root: SxProps<Theme> = {
  width: "100%",
  mb: "8px",
};

interface Props {
  name: string;
  showErrorMessage?: boolean;
}

const TextFieldWithLabel: FC<Props & TextFieldProps> = ({
  showErrorMessage = true,
  name,
  label,
  error,
  helperText,
  required,
  children,
  type,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box sx={root}>
      {!!label && (
        <Typography fontWeight="600">
          {label}{" "}
          {!!required && (
            <Typography component="span" fontWeight="600" color="error">
              *
            </Typography>
          )}
        </Typography>
      )}
      <StyledTextField
        {...rest}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        name={name}
        error={error}
        margin="dense"
        fullWidth
        InputProps={{
          ...rest.InputProps,
          ...(type === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                      {showPassword ? (
                        <VisibilityOffOutlined color="disabled" />
                      ) : (
                        <VisibilityOutlined color="disabled" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}),
        }}
      >
        {children}
      </StyledTextField>
      {showErrorMessage && (
        <Collapse in={error}>
          <StyledAlert severity="error" variant="outlined">
            {helperText}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  );
};

export default TextFieldWithLabel;
