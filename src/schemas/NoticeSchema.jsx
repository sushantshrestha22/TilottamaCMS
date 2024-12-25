import * as yup from "yup";

export const NoticeSchema = yup.object({
  title: yup.string().required("Please enter the title"),
  date: yup.string().required("Please enter the date"),
  image: yup.mixed().required("Please select an image"),
});
