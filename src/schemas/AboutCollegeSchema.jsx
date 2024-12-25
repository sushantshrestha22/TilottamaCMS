import * as yup from "yup";

export const AboutCollegeSchema = yup.object({
  description: yup.string().required("Please enter description"),
  vision: yup.string().required("Please enter vision"),
  mission: yup.string().required("Please enter mission"),
 image: yup.mixed().required("Please select an image"),
});
