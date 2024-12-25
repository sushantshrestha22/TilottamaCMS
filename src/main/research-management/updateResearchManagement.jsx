import { advisoryFields } from "@/components/fields/committee/advisory/fields";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { AdvisorySchema } from "@/schemas/AdvisorySchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateResearchManagement = () => {
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
    const response = await editData(`/api/research-management/${id}`, formData);
    return response; // Or whatever your API returns
  };

  const getManagement = async (id) => {
    const data = await fetchData(`api/research-management/${id}`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["management", id], // Ensure queryKey is an array
    queryFn: () => getManagement(id),
  });

  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        name: oldData.name,
        current_academic_position: oldData.current_academic_position,
        image: oldData.image,
        designation: oldData.designation,
        highest_academic_degree: oldData.highest_academic_degree,
        expertise: oldData.expertise,
      });
    }
  }, [oldData]);

  const mutation = useMutation({
    mutationFn: (formData) => submitFormData(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["management", id]);
      toast.success("Research management Updated successfully");
      navigate("/research-management");
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
        fields={advisoryFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={AdvisorySchema}
        title1="Research Management"
        titleLink1="/research-management"
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default UpdateResearchManagement;
