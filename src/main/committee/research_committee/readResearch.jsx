import { advisoryFields } from "@/components/fields/committee/advisory/fields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadResearch = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const { id } = useParams();

  const getResearch = async () => {
    const data = await fetchData(`api/research-committee/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["research"],
    queryFn: () => getResearch(),
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
      <ReadForm defaultValues={data} Fields={advisoryFields}   title1="Research Committee"
          titleLink1="/research-committee" />
    </div>
  );
};

export default ReadResearch;
