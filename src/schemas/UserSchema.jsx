import * as yup from "yup";

export const UserSchema = yup.object({
  firstName: yup
    .string()
    .min(3)
    .max(25)
    .required("First name must be at least 3 characters long"),
  lastName: yup
    .string()
    .min(2)
    .max(25)
    .required("Last name must be at least 2 characters long"),
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .required("Password must be at least 8 characters long"),
  role: yup.string().required("Please select your role"),
  image: yup.mixed().required("Please select an image"),
});

export const UsersSchema = yup.object({
  firstName: yup
    .string()
    .min(3)
    .max(25)
    .required("First name must be at least 3 characters long"),
  lastName: yup
    .string()
    .min(2)
    .max(25)
    .required("Last name must be at least 2 characters long"),
  email: yup.string().email().required("Please enter your email"),
  role: yup.string().required("Please select your role"),
  image: yup.mixed().required("Please select an image"),
});
