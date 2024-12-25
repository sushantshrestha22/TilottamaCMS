import { advisoryFields } from "@/components/fields/committee/advisory/fields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadResearchManagement = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const { id } = useParams();

  const getResearchManagement = async () => {
    const data = await fetchData(`api/research-management/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["management"],
    queryFn: () => getResearchManagement(),
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
      <ReadForm defaultValues={data} Fields={advisoryFields}  title1="Research Management"
          titleLink1="/research-management" />
    </div>
  );
};

export default ReadResearchManagement;
