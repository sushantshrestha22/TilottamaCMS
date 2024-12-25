import { advisoryFields } from "@/components/fields/committee/advisory/fields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { AdvisorySchema } from "@/schemas/AdvisorySchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateAdvisory = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const advisoryDefaultValue = {
      name: "",
      designation: "",
      image: "",
      current_academic_position: "",
      highest_academic_degree: "",
      expertise: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/advisory-committee", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["advisory"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("Advisory committee created successfully");
        navigate("/advisory-committee");
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
          fields={advisoryFields}
          defaultValues={advisoryDefaultValue}
          onSubmit={onSubmit}
          validationSchema={AdvisorySchema}
          title1="Advisory Committee"
          titleLink1="/advisory-committee"
        />
      </div>
    );
  }
};
export default CreateAdvisory;
