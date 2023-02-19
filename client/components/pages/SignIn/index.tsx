import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormikHelpers, useFormik } from "formik";
import { signIn } from "next-auth/react";

import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useSnackbar } from "notistack";

import { PasswordChecker, TextFieldWithLabel } from "components/common";
import { signInSchema } from "components/pages/SignIn/schema";
import { container, formStack, paper, signUpTitle, stack, submitButton, wrapper } from "components/pages/SignIn/styles";
import { AppPages, ILoginFormValues } from "types";

const INITIAL_DATA = {
  email: "",
  password: "",
};

const SignIn: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleFormikSubmit = async (
    { email, password }: ILoginFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ILoginFormValues>,
  ) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      resetForm();
      await router.push(AppPages.HOME);
    } else {
      enqueueSnackbar("Email or Password are wrong", { variant: "error" });
    }
    setSubmitting(false);
  };

  const { values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_DATA,
    validationSchema: signInSchema(),
    onSubmit: handleFormikSubmit,
  });

  return (
    <Box sx={wrapper}>
      <Container sx={container}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="center" sx={stack}>
          <Paper elevation={4} sx={paper}>
            <Typography align="center" variant="h4" sx={signUpTitle}>
              Sign In to your account!
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

              <LoadingButton
                sx={submitButton}
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIosRounded />}
                loading={isSubmitting}
              >
                Sign In
              </LoadingButton>
            </Box>

            <Typography align="center">
              If you don&apos;t have account <Link href={AppPages.SIGN_UP}>Sign Up</Link>
            </Typography>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignIn;
