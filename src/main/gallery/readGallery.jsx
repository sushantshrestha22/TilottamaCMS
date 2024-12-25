import { galleryFields } from "@/components/fields/gallery/fields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadGallery = () => {

   const { isLoggedIn, logoutUser } = useAuth();
  
    if (!isLoggedIn) {
      logoutUser();
      return null;
    }

  const { id } = useParams();

  const getGallery = async () => {
    const data = await fetchData(`api/gallery/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["gallery"],
    queryFn: () => getGallery(),
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
      <ReadForm defaultValues={data} Fields={galleryFields}  title1={"Gallery"}
          titleLink1={"/gallery"} />
    </div>
  );
};

export default ReadGallery;
