import * as yup from "yup";

export const AluminiSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  company: yup.string().required("Company is required"),
  expertise: yup.string().required("Expertise is required"),
  image: yup.mixed().required("Image is required"),
});
