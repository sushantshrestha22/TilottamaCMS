import * as yup from "yup";

export const PopupNoticeSchema = yup.object({
  title: yup.string().required("Please enter the title"),
  status: yup.string().required("Please enter the status"),
  image: yup.mixed().required("Please select an image"),
});
