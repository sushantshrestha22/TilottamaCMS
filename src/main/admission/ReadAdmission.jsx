import { admissionFormFields } from "@/components/fields/admissionForm/fields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadAdmission = () => {

   const { isLoggedIn, logoutUser } = useAuth();
  
    if (!isLoggedIn) {
      logoutUser();
      return null;
    }

  const { id } = useParams();

  const getAdmission = async () => {
    const data = await fetchData(`api/admission-form/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["admission-form"],
    queryFn: () => getAdmission(),
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="px-10">
      <ReadForm defaultValues={data} Fields={admissionFormFields}  title1={"Admission"}
          titleLink1={"/admissionForm"} />
    </div>
  );
};

export default ReadAdmission;
