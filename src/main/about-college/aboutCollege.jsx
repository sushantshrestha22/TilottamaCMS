import { aboutCollegeFields } from "@/components/fields/about-college/aboutCollegeFields";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { AboutCollegeSchema } from "@/schemas/AboutCollegeSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AboutCollege = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const queryClient = useQueryClient();

  const submitFormData = async (formData, id) => {
    const response = await editData(`/api/about-college`, formData);
    return response; // Or whatever your API returns
  };

  const getGeneral = async () => {
    const data = await fetchData(`api/about-college`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["about-college"], // Ensure queryKey is an array
    queryFn: () => getGeneral(),
  });

  const mutation = useMutation({
    // mutationKey: ['users', id],
    mutationFn: (formData) => submitFormData(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["about-college"]);
      toast.success("about-college updated successfully");
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
    ...oldData,
  };

  return (
    <div className="px-10">
      <UpdateForm
        fields={aboutCollegeFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={AboutCollegeSchema}
        title1="About College"
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default AboutCollege;
