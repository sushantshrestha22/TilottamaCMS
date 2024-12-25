import { testimonialFields } from "@/components/fields/testimonial/testimonialFields";
import ReadForm from "@/components/form/readForm";
import Loading from "@/components/loading";
import { useAuth } from "@/context/context";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const ReadTestimonial = () => {

   const { isLoggedIn, logoutUser } = useAuth();
  
    if (!isLoggedIn) {
      logoutUser();
      return null;
    }
  const { id } = useParams();

  const getTestimonials = async () => {
    const data = await fetchData(`api/testimonials/${id}`);
    console.log(data);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKeys: ["testimonials"],
    queryFn: () => getTestimonials(),
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
      <ReadForm defaultValues={data} Fields={testimonialFields} title1={"Testimonial"}
          titleLink1="/testimonial"/>
    </div>
  );
};

export default ReadTestimonial;
