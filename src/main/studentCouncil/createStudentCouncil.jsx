import { aluminiFields } from "@/components/fields/alumini/fields";
import { studentCouncilFields } from "@/components/fields/student-council/fields";
import { CreateUserForm } from "@/components/form/form";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData, postData } from "@/query/query";
import { AluminiSchema } from "@/schemas/AluminiSchemas";
import { StudentCouncilSchema } from "@/schemas/StudentCouncilSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const { isLoggedIn, logoutUser } = useAuth();
  if (!isLoggedIn) {
    logoutUser();
  } else {
    const navigate = useNavigate();

    const studentCouncilDefaultValue = {
      name: "",
      image: "",
      designation: "",
      batch: "",
      program: "",
    };

    // program data
    const getPrograms = async () => {
      const data = await fetchData("api/programs");
      console.log(data);
      return data;
    };

    const {
      data: programData,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["programs"],
      queryFn: () => getPrograms(),
    });

    const submitFormData = async (formData) => {
      const response = await postData("/api/student-council", formData);
      return response.data; // Or whatever your API returns
    };

    const mutation = useMutation({
      mutationKey: ["student-council"], // Ensure queryKey is an array
      mutationFn: submitFormData,
      onSuccess: () => {
        toast.success("Student Council created successfully");
        navigate("/studentCouncil");
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

    const fields = [
      ...studentCouncilFields,
      {
        name: "program",
        label: "Program",
        type: "select",
        options: programData?.map((item) => ({
          value: item.title,
          label: item.title,
        })),
      },
    ];

    if (isLoading)
      return (
        <div>
          <Loading />
        </div>
      );

    if (isError) return <div>Error: {error.message}</div>;

    return (
      <div className="px-10">
        <CreateUserForm
          fields={fields}
          defaultValues={studentCouncilDefaultValue}
          onSubmit={onSubmit}
          validationSchema={StudentCouncilSchema}
          title1={"Student Council"}
          titleLink1={"/studentCouncil"}
        />
      </div>
    );
  }
};

export default CreateStudent;
