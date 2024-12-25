import { newsFields } from "@/components/fields/news/fields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { NewsSchema } from "@/schemas/NewsSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const newsDefaultValue = {
        title: "",
        description: "",
        image: "",
        date: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/news", formData);
      return response.data; // Or whatever your API returns
    };

            const mutation = useMutation({
              mutationKey: ["news"], // Ensure queryKey is an array
              mutationFn: submitFormData,
              onSuccess: () => {
                toast.success("News created successfully");
                navigate("/news");
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
          fields={newsFields}
          defaultValues={newsDefaultValue}
          onSubmit={onSubmit}
          validationSchema={NewsSchema}
          title1={"News"}
          titleLink1={"/news"}
        />
      </div>
    );
  }
};

export default CreateNews;
