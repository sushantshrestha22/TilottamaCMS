import { facilitiesFields } from "@/components/fields/facilities/facilitiesFields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { FacilitiesSchema } from "@/schemas/FacilititesSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateFacilities = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const facilitiesDefaultValue = {
        title: "",
        description: "",
        icon: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/facilities", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["facilities"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("facilities created successfully");
        navigate("/facilities");
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
          fields={facilitiesFields}
          defaultValues={facilitiesDefaultValue}
          onSubmit={onSubmit}
          validationSchema={FacilitiesSchema}
          title1="Facilities"
          titleLink1="/facilities"
          
        />
        
      </div>
    );
  }
};
export default CreateFacilities;



