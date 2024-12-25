import * as yup from "yup";

export const StudentCouncilSchema = yup.object({
  name: yup.string().required("Name is required"),
  designation: yup.string().required("Designation is required"),
  batch: yup.string().required("Batch is required"),
  program: yup.string().required("Program is required"),
  image: yup.mixed().required("Image is required"),
});
