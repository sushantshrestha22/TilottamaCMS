import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { GalleryColumns } from "@/components/(main)/gallery/columns";

const Gallery = () => {
 const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getGallery = async () => {
    const data = await fetchData("api/gallery");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => getGallery(),
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
      <DataTable columns={GalleryColumns} data={data} createPath="/gallery/create" title={"Gallery"} />
    </div>
  );
};

export default Gallery;
