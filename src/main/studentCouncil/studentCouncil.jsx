import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { StudentCouncilColumns } from "@/components/(main)/studentCouncil.jsx/columns";

const StudentCouncil = () => {
 const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getStudent = async () => {
    const data = await fetchData("api/student-council");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student-council"],
    queryFn: () => getStudent(),
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
      <DataTable columns={StudentCouncilColumns} data={data} createPath="/studentCouncil/create" title={"Student Council"} />
    </div>
  );
};

export default StudentCouncil;
