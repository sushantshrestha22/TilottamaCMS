import { Button } from "@/components/ui/button";
import { fetchData } from "@/query/query";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Contact, User, Users } from "lucide-react";
import React from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  //user
  const getUser = async () => {
    const data = await fetchData("api/users?take=50");
    return data.data;
  };

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  //programs
  const getProgram = async () => {
    const data = await fetchData("api/programs");
    return data;
  };

  const { data: programData } = useQuery({
    queryKey: ["program"],
    queryFn: () => getProgram(),
  });

  //contact
  const getContact = async () => {
    const data = await fetchData("api/contact");
    return data;
  };

  const { data: contactData } = useQuery({
    queryKey: ["contact"],
    queryFn: () => getContact(),
  });

  //notice
  const getNotice = async () => {
    const data = await fetchData("api/notices");
    return data;
  };

  const { data: noticeData } = useQuery({
    queryKey: ["notice"],
    queryFn: () => getNotice(),
  });

  //news
  const getNews = async () => {
    const data = await fetchData("api/news");
    return data;
  };

  const { data: newsData } = useQuery({
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  const content = [
    {
      title: "Total Users",
      total: `${userData?.length}`,
      icon: <Users className="absolute bottom-0 left-0 h-16 w-16 opacity-50" />,
      link: "/user",
      background: "primary",
    },
    {
      title: "Total Programs",
      total: `${programData?.length}`,
      icon: (
        <FaProjectDiagram className="absolute bottom-0 left-0 h-16 w-16 opacity-50" />
      ),
      link: "/program",
      background: "accent",
    },
    {
      title: "Total Contacts",
      total: `${contactData?.length}`,
      icon: (
        <Contact className="absolute bottom-0 left-0 h-16 w-16 opacity-50" />
      ),
      link: "/contact",
      background: "destructive",
    },
  ];

  return (
    <div className="px-10">
      <div className="mb-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h3>
        <p className="text-md text-gray-600">
          Welcome to the dashboard. Here you can see the overview of the system.
        </p>
      </div>

      <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content?.map((items, index) => {
          return (
            <div
              key={index}
              className={`min-w-[250px] w-full h-[25vh] relative bg-${items.background} p-6 rounded flex flex-wrap justify-end flex-col items-end gap-2 text-primary-foreground`}
            >
              {items.icon}
              <div className="text-xl font-semibold">{items.title}</div>
              <div>{items.total}</div>
              <Link to={items.link}>
                <Button
                  variant="secondary"
                  className="bg-white text-foreground"
                >
                  Views More
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-2 gap-4">
        <div className="">
          <div className="flex justify-between items-center pe-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Notice Board
            </h3>
            <Link to="/notice">
              <Button variant="ghost" className="">
                Views More
              </Button>
            </Link>
          </div>

          <div>
            {noticeData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-secondary text-white border p-2 rounded my-4"
                >
                  <div className="text-xl flex gap-2 font-semibold">
                    <Calendar />
                    {item.title}
                  </div>
                  <div>{item.date}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="">
          <div className="flex justify-between items-center pe-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">News</h3>
            <Link to="/news">
              <Button variant="ghost" className="">
                Views More
              </Button>
            </Link>
          </div>
          <div>
            {newsData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-secondary text-white border p-2 rounded my-4"
                >
                  <div className="text-xl font-semibold flex gap-2"><Calendar />{item.title}</div>
                  <div>{item.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
