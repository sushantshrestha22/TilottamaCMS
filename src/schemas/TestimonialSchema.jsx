import * as yup from "yup";

export const TestimonialSchema = yup.object({
    name: yup.string().required("Please enter your name"),
    designation: yup.string().required("Please enter your designation"),
    testimonial: yup.string().required("Please enter your testimonial"),
    image: yup.mixed().required("Please select an image"),
});
