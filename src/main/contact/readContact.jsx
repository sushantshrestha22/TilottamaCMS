import { contactFields } from "@/components/fields/contact/contactFields";
import { testimonialFields } from "@/components/fields/testimonial/testimonialFields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadContact = () => {
  const { isLoggedIn, logoutUser } = useAuth();

  if (!isLoggedIn) {
    logoutUser();
    return null;
  }
  const { id } = useParams();

  const getContact = async () => {
    const data = await fetchData(`api/contact/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["contact"],
    queryFn: () => getContact(),
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
      <ReadForm
        defaultValues={data}
        Fields={contactFields}
        title1={"Contact"}
        titleLink1={"/contact"}
      />
    </div>
  );
};

export default ReadContact;
