import { galleryFields } from "@/components/fields/gallery/fields";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { GallerySchema } from "@/schemas/GallerySchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateGallery = () => {
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
    const response = await editData(`/api/gallery/${id}`, formData);
    return response; // Or whatever your API returns
  };

  const getUser = async (id) => {
    const data = await fetchData(`api/gallery/${id}`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gallery", id], // Ensure queryKey is an array
    queryFn: () => getUser(id),
  });

  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        title: oldData.title,
        images: oldData.images,
      });
    }
  }, [oldData]);

  const mutation = useMutation({
    mutationFn: (formData) => submitFormData(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["gallery", id]);
      toast.success("Gallery Updated successfully");
      navigate("/gallery");
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
        fields={galleryFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={GallerySchema}
        title1={"Gallery"}
        titleLink1={"/gallery"}
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default UpdateGallery;
