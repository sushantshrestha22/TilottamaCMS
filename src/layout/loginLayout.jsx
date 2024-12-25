// import LoginForm from "@/components/forms/loginForm";
import React from "react";
import Logo from "@/assets/image/Logo.png";
import { FaRegUser } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="md:grid md:grid-cols-6">
      {/* <LoginForm /> */}
      <div className="min-h-[100vh] md:skew-x-[20deg] relative md:-left-52  bg-gradient-to-r from-[#1C1C4B] to-[#4242B1] max-lg:col-span-5 lg:col-span-4 flex justify-center items-center ">
        <div className="md:skew-x-[-20deg] relative md:left-24">
          {/* <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex gap-4 justify-start items-center">
                <FaRegUser className="h-12 w-12" />
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Link
                  to="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </CardContent>
          </Card> */}
          <Outlet />
        </div>
      </div>
      <div className=" min-h-[100vh] max-lg:relative max-lg:-left-24 flex items-center justify-start  lg:col-span-2 max-md:hidden">
        <img
          src={Logo}
          width={300}
          height={300}
          alt="Logo"
          className="min-h-[200px] min-w-[200px]"
        />
      </div>
    </div>
  );
};

export default LoginLayout;
