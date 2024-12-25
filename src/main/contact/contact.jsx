import { DataTable } from "@/components/table/table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/query/query";
import Loading from "@/components/loading";
import { TestimonialColumns } from "@/components/(main)/testimonial/columns";
import { useAuth } from "@/context/context";
import { ContactColumns } from "@/components/(main)/contact/columns";

const Contact = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }

  const getContact = async () => {
    const data = await fetchData("api/contact");
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contact"],
    queryFn: () => getContact(),
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
        columns={ContactColumns}
        data={data}
        title={"Contact"}
      />
    </div>
  );
};


export default Contact;
