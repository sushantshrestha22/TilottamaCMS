import {
  Calendar,
  User,
  Inbox,
  Search,
  Settings,
  Contact,
  LayoutDashboard,
  CircuitBoard,
  Info,
  File,
  Home,
  Download,
  GalleryHorizontal,
  Image,
  Mail,
  Group,
  Users,
  University,
  Newspaper,
  Quote,
  Building,
  Notebook,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FaClipboardList,
  FaMoneyBill,
  FaProjectDiagram,
  FaResearchgate,
} from "react-icons/fa";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "User",
    url: "/user",
    icon: User,
  },
  {
    title: "Popup Notice ",
    url: "/noticePopup",
    icon: CircuitBoard,
  },
  {
    title: "Notice",
    url: "/notice",
    icon: Calendar,
  },

  {
    title: "General Information",
    url: "/general-information",
    icon: Notebook,
  },
  {
    title: "Facilities",
    url: "/facilities",
    icon: Building,
  },
  {
    title: "Testimonial",
    url: "/testimonial",
    icon: Quote,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Contact,
  },
  {
    title: "About College",
    url: "/about-college",
    icon: University,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: Mail,
  },
  {
    title: "Committees",
    url: "#",
    icon: Users,
    dropdown: [
      {
        title: "Advisory Committee",
        url: "/advisory-committee",
      },
      {
        title: "Research Committee",
        url: "/research-committee",
      },
    ],
  },

  {
    title: "News",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "Admission Open",
    url: "/admission",
    icon: FaMoneyBill,
  },
  {
    title: "Admission Form",
    url: "/admissionForm",
    icon: FaMoneyBill,
  },
  {
    title: "Home Slider",
    url: "/home-slider",
    icon: Home,
  },
  {
    title: "Download",
    url: "/downloads",
    icon: Download,
  },
  {
    title: "Gallery",
    url: "/gallery",
    icon: Image,
  },
  {
    title: "Alumini",
    url: "/alumini",
    icon: Image,
  },
  {
    title: "Student Council",
    url: "/studentCouncil",
    icon: Image,
  },

  {
    title: "Program",
    url: "/program",
    icon: FaProjectDiagram,
  },
  {
    title: "Research Management",
    url: "/research-management",
    icon: FaResearchgate,
  },
];

export function AppSidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  let pathname = useLocation().pathname;
  pathname = pathname.toLowerCase().split("/")[1];

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tilottama CMS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={` ${
                        pathname === item.url.toLowerCase().split("/")[1]
                          ? "bg-white text-primary "
                          : ""
                      }`}
                      to={item.url}
                      onClick={() =>
                        item.dropdown && toggleDropdown(item.title)
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                      {item.dropdown && (
                        <span className="ml-auto">
                          {openDropdown === item.title ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                  {item.dropdown && openDropdown === item.title && (
                    <SidebarMenu>
                      {item.dropdown.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              className={` ${
                                pathname ===
                                subItem.url.toLowerCase().split("/")[1]
                                  ? "bg-white text-primary "
                                  : ""
                              }`}
                              to={subItem.url}
                            >
                              <File className="mr-2" />
                              {subItem.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
