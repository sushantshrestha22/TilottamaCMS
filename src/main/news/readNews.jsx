import { newsFields } from "@/components/fields/news/fields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadNews = () => {

   const { isLoggedIn, logoutUser } = useAuth();
  
    if (!isLoggedIn) {
      logoutUser();
      return null;
    }

  const { id } = useParams();

  const getNews = async () => {
    const data = await fetchData(`api/news/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["news"],
    queryFn: () => getNews(),
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="px-10">
      <ReadForm defaultValues={data} Fields={newsFields} title1={"News"}
          titleLink1={"/news"} />
    </div>
  );
};

export default ReadNews;
