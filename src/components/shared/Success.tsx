import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const COUNTDOWN_TIME = 5000; // 3 seconds

const registration = {
  title: "We have received your request!",
  desc: "Admin will be checking your request. Please wait for the confirmation email. Thank you!",
};
const login = {
  title: "Successfully logged in!",
  desc: "You have been logged in successfully. You will be redirected to the dashboard in a few seconds.",
};

export default function Success({ type }: { type: string }) {
  const router = useRouter();

  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    setTimeout(() => {
      if (type === "login") {
        router.push("/dashboard");
      }
    }, COUNTDOWN_TIME);
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
        <div className="bg-gradient-to-br border border-sky-400/20 from-indigo-950 to-purple-950 rounded-md shadow-lg px-4 py-6 flex flex-col justify-center items-center">
          <div className=" flex items-center justify-center w-24 h-24 mx-auto bg-green-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-gray-100 text-center mt-4 mb-2">
            {" "}
            {type === "login" ? login.title : registration.title}{" "}
          </h1>
          <div className="mt-1 mb-8 text-sm leading-relaxed text-center text-gray-400">
            {" "}
            {type === "login" ? login.desc : registration.desc}{" "}
          </div>
          <Link
            href="/"
            className="p-2.5 px-8 w-full text-center items-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-md outline-none "
          >
            {type === "login" ? (
              <>Redirecting in... {countdown === 0 ? "0" : countdown}</>
            ) : (
              "Go Home"
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
