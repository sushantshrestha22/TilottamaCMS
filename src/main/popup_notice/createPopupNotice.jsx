import { popupNoticeFields } from "@/components/fields/popupNotice/popupNoticeFields";
import { CreateUserForm } from "@/components/form/form";
import { useAuth } from "@/context/context";
import { postData } from "@/query/query";
import { PopupNoticeSchema } from "@/schemas/PopupNoticeSchema";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePopupNotice = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const popupDefaultValue = {
        title: "",
        status: "",
        image: "",
    };

    const submitFormData = async (formData) => {
      const response = await postData("/api/notices/popup", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["popup"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("Popup Notice created successfully");
        navigate("/noticePopup");
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
          fields={popupNoticeFields}
          defaultValues={popupDefaultValue}
          onSubmit={onSubmit}
          validationSchema={PopupNoticeSchema}
          title1="PopupNotice"
          titleLink1="/noticePopup"
          title
        />
      </div>
    );
  }
};

export default CreatePopupNotice;
