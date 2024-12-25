import { programsFields } from "@/components/fields/programs/fields";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { ProgramSchema } from "@/schemas/ProgramSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProgram = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [defaultValues, setDefaultValues] = useState(null);

  const submitFormData = async (formData, id) => {
    const response = await editData(`/api/programs/${id}`, formData);
    return response; // Or whatever your API returns
  };

  const getUser = async (id) => {
    const data = await fetchData(`api/programs/${id}`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["programs", id], // Ensure queryKey is an array
    queryFn: () => getUser(id),
  });

  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        title: oldData.title,
        description: oldData.description,
        image: oldData.image,
        abbreviation: oldData.abbreviation,
        admission_procedure: oldData.admission_procedure,
        aims: oldData.aims,
        requirement: oldData.requirement,
      });
    }
  }, [oldData]);

  const mutation = useMutation({
    mutationFn: (formData) => submitFormData(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["programs", id]);
      toast.success("Program Updated successfully");
      navigate("/program");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
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

  if (!defaultValues) return null;

  return (
    <div className="px-10">
      <UpdateForm
        fields={programsFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={ProgramSchema}
        title1="Program"
        titleLink1="/program"
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default UpdateProgram;
