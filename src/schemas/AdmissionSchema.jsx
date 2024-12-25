import * as yup from "yup";

export const AdmissionSchema = yup.object({
  admission_desk_detail: yup.string().required("Please enter the admission desk detail"),
  scholarship: yup.string().required("Please enter the scholarship"),
  rules_regulations: yup.string().required("Please enter the rules and regulations"),
});
