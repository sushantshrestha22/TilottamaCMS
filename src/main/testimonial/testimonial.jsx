import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { TestimonialColumns } from "@/components/(main)/testimonial/columns";
import { useAuth } from "@/context/context";

const Testimonial = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getTestimonial = async () => {
    const data = await fetchData("api/testimonials");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonial(),
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
        columns={TestimonialColumns}
        data={data}
        createPath="/testimonial/create"
        title="Testimonial"
        
      />
    </div>
  );
};

export default Testimonial;
