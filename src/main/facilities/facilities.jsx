import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { FacilitiesColumns } from "@/components/(main)/facilities/columns";
import { useAuth } from "@/context/context";

const Facilities = () => {
 const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getFacilities = async () => {
    const data = await fetchData("api/facilities");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["facilities"],
    queryFn: () => getFacilities(),
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
      <DataTable columns={FacilitiesColumns} data={data} createPath="/facilities/create"
      title="Facilitites" />
    </div>
  );
};

export default Facilities;
