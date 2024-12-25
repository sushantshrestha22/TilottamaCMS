import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { ResearchColumns } from "@/components/(main)/committee/research-committee/columns";

const ResearchCommittee = () => {
 const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getResearch = async () => {
    const data = await fetchData("api/research-committee");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["research"],
    queryFn: () => getResearch(),
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="px-10">
      <DataTable columns={ResearchColumns} data={data} createPath="/research-committee/create"
      title={"Research Committee"} />
    </div>
  );
};

export default ResearchCommittee;
