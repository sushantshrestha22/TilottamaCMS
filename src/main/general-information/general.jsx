import { generalFields } from "@/components/fields/general-information/generalField";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { GeneralSchema } from "@/schemas/GeneralSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const General = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const queryClient = useQueryClient();

  const submitFormData = async (formData, id) => {
    const response = await editData(`/api/general-information`, formData);
    return response; // Or whatever your API returns
  };

  const getGeneral = async () => {
    const data = await fetchData(`api/general-information`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["general"], // Ensure queryKey is an array
    queryFn: () => getGeneral(),
  });

  const mutation = useMutation({
    // mutationKey: ['users', id],
    mutationFn: (formData) => submitFormData(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["general-information"]);
      toast.success("general-information updated successfully");
      window.location.reload();
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
    contact: oldData.contact,
    email: oldData.email,
    address: oldData.address,
    logo: oldData.logo,
  };

  return (
    <div className="px-10">
      <UpdateForm
        fields={generalFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={GeneralSchema}
        title1="General Information"
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default General;
