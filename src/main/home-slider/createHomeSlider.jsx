import { homeSliderFields } from "@/components/fields/home-slider/fields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { HomeSliderSchema } from "@/schemas/HomeSliderSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateHomeSlider = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const navigate = useNavigate();

  const homeSliderDefaultValue = {
    title: "",
    image: "",
  };

  const submitFormData = async (formData) => {
    const response = await postData("/api/home-slider", formData);
    return response.data; // Or whatever your API returns
  };

  const mutation = useMutation({
    mutationKey: ["homeslider"], // Ensure queryKey is an array
    mutationFn: submitFormData,
    onSuccess: () => {
      toast.success("Home Slider created successfully");
      navigate("/home-slider");
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
        fields={homeSliderFields}
        defaultValues={homeSliderDefaultValue}
        onSubmit={onSubmit}
        validationSchema={HomeSliderSchema}
        title1={"Home Slider"}
        titleLink1={"/home-slider"}
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default CreateHomeSlider;
