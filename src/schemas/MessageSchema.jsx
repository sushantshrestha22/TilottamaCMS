import * as yup from "yup";

export const MessageSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  designation: yup.string().required("Please enter your designation"),
  message: yup.string().required("Please enter your message"),
  image: yup.mixed().required("Please select an image"),
});
