import { galleryFields } from "@/components/fields/gallery/fields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { GallerySchema } from "@/schemas/GallerySchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const galleryDefaultValue = {
      title: "",
      image: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/gallery", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["gallery"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("Gallery created successfully");
        navigate("/gallery");
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
          fields={galleryFields}
          defaultValues={galleryDefaultValue}
          onSubmit={onSubmit}
          validationSchema={GallerySchema}
          title1={"Gallery"}
          titleLink1={"/gallery"}
        />
      </div>
    );
  }
};

export default CreateGallery;
