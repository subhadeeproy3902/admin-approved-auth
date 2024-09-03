"use client";

import { getEmail, login } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader, MountainIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Success from "./Success";
import { loginCookie } from "@/lib/cookie";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all the fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    const checkEmail = await getEmail(email);
    if (!checkEmail) {
      setError("Email doesn't exists. Please Register.");
      setLoading(false);
      return;
    } else if (checkEmail && !checkEmail.isRegistered) {
      setError("Admin hasn't approved you yet. Please wait.");
      setLoading(false);
      return;
    }

    const res = await login(email, password);
    setLoading(false);
    if (res) {
      loginCookie(email, checkEmail.name);
      setSuccess(true);
    } else {
      setError("Password is incorrect. Please try again.");
    }
  };

  return (
    <>
      <Link href="/">
        <MountainIcon
          size={32}
          className="mx-auto text-white absolute top-4 left-4"
        />
      </Link>
      {!success && (
        <Card className="w-full max-w-sm bg-gradient-to-br border border-sky-400/20 from-indigo-950 to-purple-950">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              {<p className="text-red-500 text-xs mt-1">{error && error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              {loading ? (
                <Loader size={20} className="animate-spin ease-linear" />
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
          <CardContent className="text-center text-sm">
            {/*Dont have acc*/}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/register" className="underline">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {success && !loading && <Success type="login" />}
    </>
  );
}
