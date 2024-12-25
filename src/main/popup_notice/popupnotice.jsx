import { DataTable } from "@/components/table/table";
import React from "react";
// import { queryKeys } from "@/constants/constant";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { popupNoticeColumns } from "@/components/(main)/popupNotice/columns";
import { useAuth } from "@/context/context";

const PopupNotice = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getPopupNotice = async () => {
    const data = await fetchData("api/notices/popup");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popup"],
    queryFn: () => getPopupNotice(),
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
        columns={popupNoticeColumns}
        data={data}
        createPath="/noticePopup/create"
        title="PopupNotice"
        titleLink="/noticePopup"
      />
    </div>
  );
};

export default PopupNotice;
