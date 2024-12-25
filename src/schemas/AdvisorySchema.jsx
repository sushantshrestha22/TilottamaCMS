import * as yup from "yup";

export const AdvisorySchema = yup.object({
  name: yup.string().required("Please enter your name"),
  designation: yup.string().required("Please enter your designation"),
  current_academic_position: yup
    .string()
    .required("Please enter your current academic position"),
  highest_academic_degree: yup
    .string()
    .required("Please enter your highest academic degree"),
  expertise: yup.string().required("Please enter your expertise"),
  image: yup.mixed().required("Please select an image"),
});
