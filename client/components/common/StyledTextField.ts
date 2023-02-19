import { formControlClasses, outlinedInputClasses, styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  [`&.${formControlClasses.marginDense}`]: {
    marginBottom: "8px",
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: theme.palette.grey["300"],
    borderWidth: "1.5px",
  },
  [`&.${outlinedInputClasses.focused}`]: {
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`.${outlinedInputClasses.root}`]: {
    [`&.${outlinedInputClasses.disabled}`]: {
      backgroundColor: theme.palette.grey["100"],

      [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.grey["300"],
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.grey["100"],

      [`&.${outlinedInputClasses.focused}`]: {
        backgroundColor: "inherit",

        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.palette.primary.main,
        },
      },
      [`&.${outlinedInputClasses.error}`]: {
        backgroundColor: "inherit",

        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.palette.error.main,
        },
      },
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.grey["400"],
      },
      [`&.${outlinedInputClasses.disabled}`]: {
        backgroundColor: theme.palette.grey["100"],

        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.palette.grey["300"],
        },
      },
    },
  },
}));

export default StyledTextField;
