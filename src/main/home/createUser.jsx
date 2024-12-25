import { userFields } from "@/components/fields/users/userFields";
import { CreateUserForm } from "@/components/form/form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { UserSchema } from "@/schemas/UserSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const userDefaultValue = {
      firstName: "",
      lastName: "",
      image: "",
      email: "",
      password: "",
      role: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/users", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["users"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("User created successfully");
        navigate("/user");
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
          fields={userFields}
          defaultValues={userDefaultValue}
          onSubmit={onSubmit}
          validationSchema={UserSchema}
          title1="User"
          titleLink1="/user"
          titleLink2="/user/create"
        />
      </div>
    );
  }
};
export default CreateUser;
