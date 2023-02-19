import * as yup from "yup";

export const signInSchema = () => {
  return yup.object().shape({
    email: yup.string().email("Email must be a valid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Too short")
      .required("Password is required")
      .matches(/[A-Z]/, "Password must have uppercase letters")
      .matches(/\d/, "Password must have numbers")
      .matches(/[!@#$%^&*]/, "Password must have one of !@#$%^&* characters"),
  });
};
