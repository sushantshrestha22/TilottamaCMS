import { DataTable } from "@/components/table/table";
import React from "react";
// import { queryKeys } from "@/constants/constant";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import { userColumns } from "@/components/(main)/user/columns";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

const Home = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }
  const getUser = async () => {
    const data = await fetchData("api/users?take=50");
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUser(),
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
        columns={userColumns}
        data={data}
        createPath="/user/create"
        title="User"
        titleLink="/user"
      />
    </div>
  );
};

export default Home;
