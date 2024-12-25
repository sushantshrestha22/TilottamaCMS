import { aluminiFields } from "@/components/fields/alumini/fields";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { AluminiSchema } from "@/schemas/AluminiSchemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAlumini = () => {
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
    const response = await editData(`/api/alumini/${id}`, formData);
    return response; // Or whatever your API returns
  };

  const getAlumini = async (id) => {
    const data = await fetchData(`api/alumini/${id}`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["alumini", id], // Ensure queryKey is an array
    queryFn: () => getAlumini(id),
  });

  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        name: oldData.name,
        email: oldData.email,
        image: oldData.image,
        company: oldData.company,
        expertise: oldData.expertise,
      });
    }
  }, [oldData]);

  const mutation = useMutation({
    mutationFn: (formData) => submitFormData(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["alumini", id]);
      toast.success("Alumini Updated successfully");
      navigate("/alumini");
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
        fields={aluminiFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={AluminiSchema}
        title1={"Alumini"}
        titleLink1={"/alumini"}
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default UpdateAlumini;
