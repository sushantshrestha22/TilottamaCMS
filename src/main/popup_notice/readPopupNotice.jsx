import { popupNoticeFields } from "@/components/fields/popupNotice/popupNoticeFields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadPopup = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const { id } = useParams();

  const getPopupNotice = async (id) => {
    const response = await fetchData(`api/notices/popup`);
    const result = response.filter((item) => item.id === id);
    console.log(result);
    return result;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["popup", id],
    queryFn: () => getPopupNotice(id),
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  console.log(data[0].image);
  if (isError) return <div>Error: {error.message}</div>;

  const defaultValues = {
    ...data[0],
  };
  return (
    <div className="px-10">
      <ReadForm
        defaultValues={defaultValues}
        Fields={popupNoticeFields}
        title1="PopupNotice"
        titleLink1="noticePopup"
      />
    </div>
  );
};

export default ReadPopup;
