import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { ResearchManagementColumns } from "@/components/(main)/research-management/columns";

const ResearchManagement = () => {
 const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getResearchManagement = async () => {
    const data = await fetchData("api/research-management");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["management"],
    queryFn: () => getResearchManagement(),
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
      <DataTable columns={ResearchManagementColumns} data={data} createPath="/research-management/create" title={"Research Management"}/>
    </div>
  );
};

export default ResearchManagement;
