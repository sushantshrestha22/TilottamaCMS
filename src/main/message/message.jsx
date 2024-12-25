import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { MessagesColumns } from "@/components/(main)/message/columns";

const Messages = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getMessages = async () => {
    const data = await fetchData("api/messages");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(),
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
        columns={MessagesColumns}
        data={data}
        createPath="/messages/create"
        title="Messages"
      />
    </div>
  );
};

export default Messages;
