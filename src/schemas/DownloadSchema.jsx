import * as yup from "yup";

export const DownloadSchema = yup.object({
  date: yup.date().required("Please select a date"),
  description: yup.string().required("Please enter a description"),
  file: yup
    .mixed()
    .required("Please select a file")
    .test("fileType", "Only PDF files are allowed", (value) => {
      return value && value.type === "pdf/*";
    }),
});
