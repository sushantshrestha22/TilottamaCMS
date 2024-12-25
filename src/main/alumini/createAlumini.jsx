import { aluminiFields } from "@/components/fields/alumini/fields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { AluminiSchema } from "@/schemas/AluminiSchemas";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateAlumini = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const aluminiDefaultValue = {
      name: "",
      email: "",
      image: "",
      company: "",
      expertise: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/alumini", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["alumini"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("Alumini created successfully");
        navigate("/alumini");
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
          fields={aluminiFields}
          defaultValues={aluminiDefaultValue}
          onSubmit={onSubmit}
          validationSchema={AluminiSchema}
          title1={"Alumini"}
          titleLink1={"/alumini"}
        />
      </div>
    );
  }
};

export default CreateAlumini;
