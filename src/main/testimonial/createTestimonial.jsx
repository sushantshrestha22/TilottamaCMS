import { testimonialFields } from "@/components/fields/testimonial/testimonialFields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { TestimonialSchema } from "@/schemas/TestimonialSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTestimonial = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const testimonialDefaultValue = {
      name: "",
      designation: "",
      image: "",
      testimonial: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/testimonials", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["testimonials"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("testimonial created successfully");
        navigate("/testimonial");
        // Optionally reset form or show success message
      },
      onError: (error) => {
        toast.error(error.message || "An error occurred");
        // Handle error state here
      },
    });

    const onSubmit = async (data) => {
      console.log(data);
      const formData = new FormData();

      // Append all fields to FormData

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      mutation.mutate(formData); // Trigger the mutation with the FormData
    };

    return (
      <div className="px-10">
        <CreateUserForm
          fields={testimonialFields}
          defaultValues={testimonialDefaultValue}
          onSubmit={onSubmit}
          validationSchema={TestimonialSchema}
          title1={"Testimonial"}
          titleLink1="/testimonial"
        />
      </div>
    );
  }
};
export default CreateTestimonial;
