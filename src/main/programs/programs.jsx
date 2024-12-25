import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { programsFields } from "@/components/fields/programs/fields";
import { programsColumns } from "@/components/(main)/programs/columns";

const Programs = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getPrograms = async () => {
    const data = await fetchData("api/programs");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["programs"],
    queryFn: () => getPrograms(),
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
      <DataTable
        columns={programsColumns}
        data={data}
        createPath="/program/create"
        title={"Program"}
      />
    </div>
  );
};

export default Programs;
