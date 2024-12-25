import { aluminiFields } from "@/components/fields/alumini/fields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadAlumini = () => {

   const { isLoggedIn, logoutUser } = useAuth();
  
    if (!isLoggedIn) {
      logoutUser();
      return null;
    }

  const { id } = useParams();

  const getAlumini = async () => {
    const data = await fetchData(`api/alumini/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["alumini"],
    queryFn: () => getAlumini(),
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
      <ReadForm defaultValues={data} Fields={aluminiFields}  title1={"Alumini"}
          titleLink1={"/alumini"} />
    </div>
  );
};

export default ReadAlumini;
