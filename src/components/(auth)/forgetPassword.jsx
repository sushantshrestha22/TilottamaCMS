import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgetPasswordSchema, LogInSchema } from "@/schemas/LoginSchema";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postDataa("api/auth/forgetPassword", data);
      toast.success("Mail is sent successfully !", {
        position: "top-center",
      });

      navigate("/login");
    } catch (error) {
      toast.error(error);
    } finally {
      reset(); // Hide loading state
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                {...register("email")}
                className={cn(
                  "flex h-10 w-full my-2 rounded-md border border-input bg-background px-3 py-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                )}
              />
              <p className="text-destructive">{errors.email?.message}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="space-x-2 flex flex-col items-end gap-2 w-full">
              <Link to="/login">Have an account? Login</Link>
              <Button type="submit" variant="ghost" className="w-full">
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ForgetPassword;
