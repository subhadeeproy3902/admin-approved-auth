import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotLoggedIn() {
  return (
    <div className="z-10 text-center">
      <Image
        alt="globe wireframe"
        width={400}
        height={400}
        className="w-full -z-10 absolute inset-0 left-1/2 -translate-x-1/2 max-w-5xl mx-auto object-cover translate-y-48 animate-pulse"
        src="/globe.svg"
      />
      <div className="mx-auto max-w-md text-center">
        <UserIcon className="mx-auto h-20 w-20 text-primary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">You&apos;re not logged in</h1>
        <p className="mt-4 text-muted-foreground">
          You need to be logged in to access this page. If you don&apos;t have an account, you can create one for free.
        </p>
        <div className="mt-6">
          <Link
            href="/login"
            className="inline-flex items-center rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 px-8"
            prefetch={false}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
