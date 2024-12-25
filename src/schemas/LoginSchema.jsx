import * as yup from "yup";

export const LogInSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(6).max(25).required("Please enter your password"),
});
export const ForgetPasswordSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
});

export const ResetPasswordSchema = yup.object({
  password: yup.string().min(6).max(25).required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const ChangePasswordSchema = yup.object({
  currentPassword: yup.string().min(8).max(25).required("Please enter your password"),
  newPassword: yup.string().min(8).max(25).required("Please enter your new password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match with new password"),
});
