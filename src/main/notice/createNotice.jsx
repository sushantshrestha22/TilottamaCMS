import { noticesFields } from "@/components/fields/Notices/notices";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { NoticeSchema } from "@/schemas/NoticeSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateNotice = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const noticeDefaultValue = {
        title: "",
        image: "",
        date: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/notices", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["notices"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("Notices created successfully");
        navigate("/notice");
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
          fields={noticesFields}
          defaultValues={noticeDefaultValue}
          onSubmit={onSubmit}
          validationSchema={NoticeSchema}
          title1={"Notice"}
          titleLink1={"/notice"}
        />
      </div>
    );
  }
};

export default CreateNotice;
