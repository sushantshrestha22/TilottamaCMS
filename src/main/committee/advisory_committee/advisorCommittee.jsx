import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { AdvisoryColumns } from "@/components/(main)/committee/advisory-committee/columns";

const AdvisorCommittee = () => {
 const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getAdvisory = async () => {
    const data = await fetchData("api/advisory-committee");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["advisory"],
    queryFn: () => getAdvisory(),
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
      <DataTable columns={AdvisoryColumns} data={data} createPath="/advisory-committee/create"
      title={"Advisory Committee"} />
    </div>
  );
};

export default AdvisorCommittee;
