import { DataTable } from "@/components/table/table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchData, postData } from "@/query/query";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { HomeSliderColumns } from "@/components/(main)/home-slider/columns";
import { homeSliderFields } from "@/components/fields/home-slider/fields";
import { HomeSliderSchema } from "@/schemas/HomeSliderSchema";
import { CreateUserForm } from "@/components/form/form";

const HomeSlider = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

 

  const getHomeSlider = async () => {
    const data = await fetchData("api/home-slider");
    console.log(data);
    return data;
  };

 
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["homeslider"],
    queryFn: () => getHomeSlider(),
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
    
      <DataTable columns={HomeSliderColumns} data={data}  createPath="/home-slider/create" title={"Home Slider"}/>
    </div>
  );
};

export default HomeSlider;
