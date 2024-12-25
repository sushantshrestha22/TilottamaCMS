import { messageFields } from "@/components/fields/message/fields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { MessageSchema } from "@/schemas/MessageSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateMessage = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const messagesDefaultValue = {
      name: "",
      designation: "",
      image: "",
      message: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/messages", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["messages"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("messages created successfully");
        navigate("/messages");
        // Optionally reset form or show success message
      },
      onError: () => {
        toast.error( 
           "Designation already exists, edit the existing one");
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
          fields={messageFields}
          defaultValues={messagesDefaultValue}
          onSubmit={onSubmit}
          validationSchema={MessageSchema}
          title1={"Message"}
          titleLink1="/messages"
          
        />
      </div>
    );
  }
};

export default CreateMessage;
