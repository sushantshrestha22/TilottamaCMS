import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Link, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout() {
  const { user } = useAuth();

  // const getUser = async () => {
  //   try {
  //     const res = await postDataa("api/users/verify");
  //     if (res.status === 200) {
  //       return res.data;
  //     }
  //   } catch (error) {
  //     return null;
  //   }
  // }
  //   const { data } = useQuery({
  //     queryKey: ["verify"],
  //     queryFn:()=> getUser(),
  //   });

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarInset>
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <SidebarTrigger />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={user?.image} alt="error Image" />
                    <AvatarFallback>
                      {user?.firstName ? user?.firstName[0].toUpperCase() : "U"}
                      {user?.lastName ? user?.lastName[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-semibold text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={`/changePassword/${user?.id}`}>
                    Change Password
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="relative">
            <Outlet />
          </div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
