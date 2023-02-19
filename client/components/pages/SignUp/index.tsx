import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormikHelpers, useFormik } from "formik";
import { AxiosError } from "axios";

import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useSnackbar } from "notistack";

import { PasswordChecker, TextFieldWithLabel } from "components/common";
import { signUpSchema } from "components/pages/SignUp/schema";
import { container, formStack, paper, signUpTitle, stack, submitButton, wrapper } from "components/pages/SignUp/styles";
import { clientRequests } from "requests";
import { returnAxiosError } from "helpers";
import { AppPages, ISignUpFormValues } from "types";

const INITIAL_DATA = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleFormikSubmit = async (
    { email, password, confirmPassword }: ISignUpFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ISignUpFormValues>,
  ) => {
    try {
      const data = await clientRequests.signUp({
        email,
        password,
        confirmPassword,
      });
      enqueueSnackbar(data.message, { variant: "success" });
      resetForm();
      await router.push(AppPages.SIGN_IN);
    } catch (e) {
      if (e instanceof AxiosError) {
        enqueueSnackbar(returnAxiosError(e), { variant: "error" });
      }
      setSubmitting(false);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_DATA,
    validationSchema: signUpSchema(),
    onSubmit: handleFormikSubmit,
  });

  return (
    <Box sx={wrapper}>
      <Container sx={container}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="center" sx={stack}>
          <Paper elevation={4} sx={paper}>
            <Typography align="center" variant="h4" sx={signUpTitle}>
              Create new account!
            </Typography>

            <Box component="form" sx={formStack} onSubmit={handleSubmit}>
              <TextFieldWithLabel
                type="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email && !!touched.email}
                helperText={touched.email && errors.email}
                required
              />

              <TextFieldWithLabel
                type="password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password && !!touched.password}
                required
                showErrorMessage={false}
              />
              <PasswordChecker password={values.password} error={!!errors.password && !!touched.password} />

              <TextFieldWithLabel
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.confirmPassword && !!touched.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                required
              />

              <LoadingButton
                sx={submitButton}
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIosRounded />}
                loading={isSubmitting}
              >
                Sign Up
              </LoadingButton>
            </Box>

            <Typography align="center">
              If you already have account <Link href={AppPages.SIGN_IN}>Sign In</Link>
            </Typography>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUp;
