"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff, Loader, MountainIcon } from "lucide-react";
import { createUser, getEmail } from "@/actions/user.actions";
import Success from "./Success";

export default function RegisterForm() {
  const radios = [
    {
      name: "Manager",
    },
    {
      name: "Employee",
    },
  ];
  const [role, setRole] = useState("EMPLOYEE");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
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
    if (checkEmail) {
      setError("Email already exists. Please Log In.");
      setLoading(false);
      return;
    }

    const res = await createUser(name, email, password, role);
    setLoading(false);
    if (res) {
      setSuccess(true);
    } else {
      setError("Something went wrong. Please try again.");
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
        <div className="flex w-full max-w-sm justify-center items-center gap-4 flex-col">
          <div className="w-full">
            <h1 className="text-lg text-gray-100 font-bold">
              Select your role first.
            </h1>
            <ul className="mt-6 flex lg:flex-row flex-col gap-3 w-full mb-4">
              {radios.map((item, idx) => (
                <li key={idx} className="w-full">
                  <label htmlFor={item.name} className="block relative">
                    <input
                      id={item.name}
                      type="radio"
                      defaultChecked={idx == 1 ? true : false}
                      name="payment"
                      className="sr-only peer"
                      onClick={() =>
                        setRole(item.name.toUpperCase().replace(" ", "_"))
                      }
                    />
                    <div className="w-full p-5 cursor-pointer rounded-lg border bg-transparent shadow-sm ring-purple-600 peer-checked:ring-2 duration-200 border-white/40">
                      <div className="pl-7">
                        <h3 className="leading-none text-gray-100 font-bold">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-purple-600 w-4 h-4 rounded-full"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <Card className="w-full bg-gradient-to-br border border-sky-400/20 from-indigo-950 to-purple-950">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Full Name"
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      required={true}
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
                  {
                    <p className="text-red-500 text-xs mt-1">
                      {error && error}
                    </p>
                  }
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {loading ? (
                    <Loader size={20} className="animate-spin ease-linear" />
                  ) : (
                    "Create an account"
                  )}
                </Button>
              </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Log in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {success && !loading && <Success type="register" />}
    </>
  );
}
