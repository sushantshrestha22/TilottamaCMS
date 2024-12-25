import { aluminiFields } from "@/components/fields/alumini/fields";
import { studentCouncilFields } from "@/components/fields/student-council/fields";
import { UpdateForm } from "@/components/form/updateForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { editData, fetchData } from "@/query/query";
import { StudentCouncilSchema } from "@/schemas/StudentCouncilSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [defaultValues, setDefaultValues] = useState(null);

  // program data
  const getPrograms = async () => {
    const data = await fetchData("api/programs");
    console.log(data);
    return data;
  };

  const {
    data: programData,
  } = useQuery({
    queryKey: ["programs"],
    queryFn: () => getPrograms(),
  });

  const submitFormData = async (formData, id) => {
    const response = await editData(`/api/student-council/${id}`, formData);
    return response; // Or whatever your API returns
  };

  const getStudentCouncil = async (id) => {
    const data = await fetchData(`api/student-council/${id}`);
    return data;
  };

  const {
    data: oldData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["alumini", id], // Ensure queryKey is an array
    queryFn: () => getStudentCouncil(id),
  });

  useEffect(() => {
    if (oldData) {
      setDefaultValues({
        name: oldData.name,
        image: oldData.image,
        designation: oldData.designation,
        batch: oldData.batch,
        program: oldData.program,
      });
    }
  }, [oldData]);

  const mutation = useMutation({
    mutationFn: (formData) => submitFormData(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["student-council", id]);
      toast.success("Student council Updated successfully");
      navigate("/studentCouncil");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
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

  if (isError) return <div>Error: {error.message || "An error occurred"}</div>;

  if (!defaultValues) return null;

  return (
    <div className="px-10">
      <UpdateForm
        fields={fields}
        defaultValue={defaultValues}
        onSubmit={onSubmit}
        validationSchema={StudentCouncilSchema}
        title1={"Student Council"}
        titleLink1={"/studentCouncil"}
      />
      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed!</p>}
      {mutation.isSuccess && (
        <p className="text-green-500">Submission successful!</p>
      )}
    </div>
  );
};

export default UpdateStudent;
