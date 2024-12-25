import { DataTable } from "@/components/table/table";
import React from "react";
// import { queryKeys } from "@/constants/constant";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { NoticeColumns } from "@/components/(main)/notice/columns";
import { useAuth } from "@/context/context";

const Notices = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getNotices = async () => {
    const data = await fetchData("api/notices");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notice"],
    queryFn: () => getNotices(),
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
        columns={NoticeColumns}
        data={data}
        createPath="/notice/create"
        title="Notice"
      />
    </div>
  );
};

export default Notices;
