import * as yup from "yup";

export const GeneralSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  contact: yup.string().required("Please enter your contact"),
  address: yup.string().required("Please enter your address"),
  logo: yup.mixed().required("Please select a logo"),
});
