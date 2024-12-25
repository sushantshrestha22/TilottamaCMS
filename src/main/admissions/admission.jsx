import { admissionFields } from "@/components/fields/admission/fields";
import { CreateUserForm } from "@/components/form/form";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editDataa, fetchData } from "@/query/query";
import { AdmissionSchema } from "@/schemas/AdmissionSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const Admissions = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const queryClient = useQueryClient();

  const submitFormData = async (formData) => {
    const response = await editDataa(`/api/admissions`, formData);
    return response; // Or whatever your API returns
  };

  const getAdmission = async () => {
    const data = await fetchData(`/api/admissions`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admissions"], // Ensure queryKey is an array
    queryFn: () => getAdmission(),
  });

  const mutation = useMutation({
    // mutationKey: ['users', id],
    mutationFn: (formData) => submitFormData(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["admissions"]);
      toast.success("Admission updated successfully");
    //   window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    // Append all fields to FormData

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    mutation.mutate(formData); // Trigger the mutation with the FormData
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (isError) return <div>Error: {error.message || "An error occurred"}</div>;

  const defaultValues = {
    admission_desk_detail: oldData.admission_desk_detail,
    scholarship: oldData.scholarship,
    rules_regulations: oldData.rules_regulations,
  };

  return (
    <div className="px-10">
      <UpdateForm
        fields={admissionFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={AdmissionSchema}
        title1={"Admissions"}
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default Admissions;
