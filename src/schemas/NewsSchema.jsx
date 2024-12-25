import * as yup from "yup";

export const NewsSchema = yup.object({
  title: yup.string().required("Please enter the title"),
  description: yup.string().required("Please enter the description"),
  date: yup.date().required("Please enter the date"),
  image: yup.mixed().required("Please select an image"),
});
