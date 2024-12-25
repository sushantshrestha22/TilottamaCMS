import * as yup from "yup";

export const FacilitiesSchema = yup.object({
  title: yup.string().required("Please enter your title"),
  description: yup.string().required("Please enter your description"),
  icon: yup.mixed().required("Please select a icon"),
});
