import * as yup from "yup";

export const GallerySchema = yup.object({
  title: yup.string().required("Please enter the title"),
  images: yup.mixed().required("Please select an image"),
});
