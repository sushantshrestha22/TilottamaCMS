import { newsFields } from "@/components/fields/news/fields";
import { testimonialFields } from "@/components/fields/testimonial/testimonialFields";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { NewsSchema } from "@/schemas/NewsSchema";
import { TestimonialSchema } from "@/schemas/TestimonialSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTestimonial = () => {
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
    const response = await editData(`/api/testimonials/${id}`, formData);
    return response; // Or whatever your API returns
  };

  const getTestimonial = async (id) => {
    const data = await fetchData(`api/testimonials/${id}`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["testimonials", id], // Ensure queryKey is an array
    queryFn: () => getTestimonial(id),
  });

  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        name: oldData.name,
        testimonial: oldData.testimonial,
        image: oldData.image,
        designation: oldData.designation,
      });
    }
  }, [oldData]);

  const mutation = useMutation({
    mutationFn: (formData) => submitFormData(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["testimonials", id]);
      toast.success("Testimonial Updated successfully");
      navigate("/Testimonial");
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
        fields={testimonialFields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={TestimonialSchema}
        title1={"Testimonial"}
        titleLink1="/testimonial"
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default UpdateTestimonial;
