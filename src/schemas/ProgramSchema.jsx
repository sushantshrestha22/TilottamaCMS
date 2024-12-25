import * as yup from "yup";

export const ProgramSchema = yup.object({
  title: yup.string().required("Please enter the title"),
  abbreviation: yup.string().required("Please enter the abbreviation"),
  description: yup.string().required("Please enter the description"),
  requirement: yup.string().required("Please enter the requirement"),
  aims: yup.string().required("Please enter the aims"),
  admission_procedure: yup
    .string()
    .required("Please enter the admission procedure"),
  image: yup.mixed().required("Please select an image"),
});
