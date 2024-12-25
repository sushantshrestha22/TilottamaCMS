import * as yup from "yup";

export const HomeSliderSchema = yup.object({
  title: yup.string().required("Please enter title"),
  image: yup.mixed().required("Please select an image"),
});
