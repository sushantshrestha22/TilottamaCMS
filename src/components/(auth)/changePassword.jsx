import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordSchema } from "@/schemas/LoginSchema";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { postDataa } from "@/query/query";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postDataa(`api/users/change-password/${id}`, data);
      toast.success("Password changed successfully !!", {
        position: "top-center",
      });

      navigate("/logout");
    } catch (error) {
      toast.error(error);
    } finally {
      reset(); // Hide loading state
    }
  };

  return (
    <>
      <div className="flex flex-col px-10 h-[90vh] w-full">
        <Link to="/" className="my-4">
          <Button variant="accent">Back</Button>
        </Link>
        <div className="w-full flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="lg:w-[500px] bg-primary">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Change your password here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input
                    type="currentPassword"
                    id="currentPassword"
                    name="currentPassword"
                    {...register("currentPassword")}
                    className={cn(
                      "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    )}
                  />
                  <p className="text-destructive">
                    {errors.currentPassword?.message}
                  </p>
                </div>
                <div>
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="newPassword"
                    id="newPassword"
                    name="newPassword"
                    {...register("newPassword")}
                    className={cn(
                      "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    )}
                  />
                  <p className="text-destructive">
                    {errors.newPassword?.message}
                  </p>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    {...register("confirmPassword")}
                    className={cn(
                      "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    )}
                  />
                  <p className="text-destructive">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="space-x-2 flex flex-col items-end gap-2 w-full">
                  {/* <Link to="/login">Have an account? Login</Link> */}
                  <Button type="submit" variant="ghost" className="w-full">
                    Send
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
